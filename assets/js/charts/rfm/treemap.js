/* ==========================================================================
   charts/rfm/treemap.js — RFM Segment D3 Treemap Renderer
   SuperStorys Analytics Dashboard
   Depends on: core/color-utils.js (hexAlpha)
   ========================================================================== */

'use strict';

/**
 * Renders the RFM segment treemap using D3.js.
 * Protected by a `dataset.built` flag so it only renders once.
 *
 * @param {Array<{name: string, value: number, color: string}>} segments
 */
function initRFMTreemap(segments) {
    const container = document.getElementById('rfmTreemap');
    if (!container || container.dataset.built) return;
    container.dataset.built = '1';

    const W = container.clientWidth || 700;
    const H = 380;

    const svg = d3.select(container).append('svg')
        .attr('width', '100%')
        .attr('height', H)
        .attr('viewBox', `0 0 ${W} ${H}`);

    const root = d3.hierarchy({ children: segments })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    d3.treemap().size([W, H]).padding(3).round(true)(root);

    // Floating tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'map-tooltip')
        .style('pointer-events', 'none');

    const cell = svg.selectAll('g')
        .data(root.leaves())
        .join('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`);

    // Background rect
    cell.append('rect')
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('rx', 8)
        .attr('fill', d => d.data.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function (event, d) {
            d3.select(this).attr('opacity', 0.85);
            tooltip
                .html(`<strong>${d.data.name}</strong><br/>Clientes: ${d.data.value.toLocaleString('pt-BR')}`)
                .classed('visible', true);
        })
        .on('mousemove', event => {
            tooltip
                .style('left', (event.clientX + 12) + 'px')
                .style('top', (event.clientY - 36) + 'px');
        })
        .on('mouseleave', function () {
            d3.select(this).attr('opacity', 1);
            tooltip.classed('visible', false);
        });

    // Segment name label
    cell.append('text')
        .attr('x', d => (d.x1 - d.x0) / 2)
        .attr('y', d => (d.y1 - d.y0) / 2 - 6)
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-family', "'DM Sans', sans-serif")
        .attr('font-size', d => (d.x1 - d.x0) > 120 ? 13 : 10)
        .attr('font-weight', '600')
        .text(d => (d.x1 - d.x0) > 70 ? d.data.name : '');

    // Customer count label
    cell.append('text')
        .attr('x', d => (d.x1 - d.x0) / 2)
        .attr('y', d => (d.y1 - d.y0) / 2 + 12)
        .attr('text-anchor', 'middle')
        .attr('fill', 'rgba(255,255,255,0.75)')
        .attr('font-family', "'DM Mono', monospace")
        .attr('font-size', 11)
        .text(d => (d.x1 - d.x0) > 90 ? d.data.value.toLocaleString() : '');
}
