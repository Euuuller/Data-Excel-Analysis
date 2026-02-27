/* ==========================================================================
   charts/descriptive/us-map.js — D3 US Choropleth Map (Shared)
   SuperStorys Analytics Dashboard
   Shared by: charts/descriptive/index.js and charts/descriptive2/index.js
   ========================================================================== */

'use strict';

/**
 * FIPS state code → US state abbreviation lookup.
 * Defined here so it lives alongside the map logic it serves.
 */
const FIPS_TO_ABBREV = {
    '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
    '08': 'CO', '09': 'CT', '10': 'DE', '12': 'FL', '13': 'GA',
    '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA',
    '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME', '24': 'MD',
    '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS', '29': 'MO',
    '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH', '34': 'NJ',
    '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH',
    '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI', '45': 'SC',
    '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT', '50': 'VT',
    '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI', '56': 'WY',
};

/**
 * Fetches US Atlas topology and renders a choropleth map into a container.
 * Each instance uses a unique SVG gradient ID to avoid DOM conflicts.
 *
 * @param {Object.<string, number>} stateSales  - State abbreviation → revenue
 * @param {string}                  containerId - Target container element ID
 * @param {string}                  gradientId  - Unique SVG gradient `id` attribute
 */
async function initUSMap(stateSales, containerId, gradientId) {
    const container = document.getElementById(containerId);
    if (!container || container.dataset.built) return;
    container.dataset.built = '1';

    const W = container.clientWidth || 500;
    const H = 260;

    let usJson;
    try {
        const res = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
        usJson = await res.json();
    } catch {
        container.innerHTML = `<div style="padding:1.5rem;color:#64748B;font-size:13px">Mapa indisponível (sem conexão)</div>`;
        return;
    }

    const states = topojson.feature(usJson, usJson.objects.states);
    const projection = d3.geoAlbersUsa().fitSize([W, H], states);
    const path = d3.geoPath().projection(projection);
    const maxVal = Math.max(...Object.values(stateSales));
    const colorScale = d3.scaleSequential([0, maxVal], d3.interpolate('#EEF2FF', '#3730A3'));

    const svg = d3.select(container).append('svg')
        .attr('width', '100%').attr('height', H).attr('viewBox', `0 0 ${W} ${H}`);

    const tooltip = d3.select('body').append('div').attr('class', 'map-tooltip');

    svg.selectAll('path')
        .data(states.features)
        .join('path')
        .attr('d', path)
        .attr('fill', d => {
            const abbr = FIPS_TO_ABBREV[String(d.id).padStart(2, '0')];
            return colorScale(stateSales[abbr] || 0);
        })
        .attr('stroke', '#fff').attr('stroke-width', 0.8).style('cursor', 'pointer')
        .on('mouseover', function (event, d) {
            d3.select(this).attr('stroke', '#6366F1').attr('stroke-width', 1.5);
            const abbr = FIPS_TO_ABBREV[String(d.id).padStart(2, '0')] || '??';
            tooltip.html(`<strong>${abbr}</strong> — $${(stateSales[abbr] || 0).toLocaleString()}`).classed('visible', true);
        })
        .on('mousemove', event => {
            tooltip.style('left', (event.clientX + 12) + 'px').style('top', (event.clientY - 36) + 'px');
        })
        .on('mouseleave', function () {
            d3.select(this).attr('stroke', '#fff').attr('stroke-width', 0.8);
            tooltip.classed('visible', false);
        });

    // Colour legend gradient bar
    const lgSvg = d3.select(container).append('svg')
        .attr('width', '100%').attr('height', 30).attr('viewBox', `0 0 ${W} 30`);
    const defs = lgSvg.append('defs');
    const lg = defs.append('linearGradient').attr('id', gradientId);
    lg.append('stop').attr('offset', '0%').attr('stop-color', '#EEF2FF');
    lg.append('stop').attr('offset', '100%').attr('stop-color', '#3730A3');
    lgSvg.append('rect').attr('x', W / 2 - 80).attr('y', 8).attr('width', 160).attr('height', 10).attr('rx', 5).attr('fill', `url(#${gradientId})`);
    lgSvg.append('text').attr('x', W / 2 - 85).attr('y', 22).attr('text-anchor', 'end').attr('font-size', 9).attr('fill', '#94A3B8').text('$0');
    lgSvg.append('text').attr('x', W / 2 + 85).attr('y', 22).attr('text-anchor', 'start').attr('font-size', 9).attr('fill', '#94A3B8').text('$320k');
}
