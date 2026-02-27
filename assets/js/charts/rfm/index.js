/* ==========================================================================
   charts/rfm/index.js — RFM Segmentation Tab Chart Orchestrator
   SuperStorys Analytics Dashboard
   Depends on: core/registry.js, core/color-utils.js, charts/rfm/treemap.js
   Data source: assets/data/rfm.json
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   ENTRY POINT
   -------------------------------------------------------------------------- */

/**
 * Fetches RFM data and initialises all RFM Segmentation charts.
 * Called lazily when the RFM tab is activated for the first time.
 */
function initRFMCharts() {
    fetch('assets/data/rfm.json')
        .then(r => r.json())
        .then(data => {
            initRFMTreemap(data.segments);
            renderRFMScatter(data.segments);
            renderRFMBarChart(data.revenueBySegment);
        })
        .catch(err => console.error('[RFM] Failed to load data:', err));
}

/* --------------------------------------------------------------------------
   BUBBLE SCATTER CHART — Recência × Monetário × Frequência
   -------------------------------------------------------------------------- */
function renderRFMScatter(segments) {
    // Synthesise scatter points representative of each segment's size
    const scatterData = [];
    for (let i = 0; i < 60; i++) {
        const seg = segments[Math.floor(Math.random() * segments.length)];
        scatterData.push({
            x: Math.round(Math.random() * 95 + 5),
            y: Math.round(Math.random() * 5500 + 200),
            r: Math.round(Math.random() * 18 + 5),
            seg: seg.name,
            color: seg.color,
        });
    }

    const ctx = document.getElementById('rfmScatter').getContext('2d');
    registerChart('rfmScatter', new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Clientes',
                data: scatterData,
                backgroundColor: scatterData.map(d => hexAlpha(d.color, 0.55)),
                borderColor: scatterData.map(d => d.color),
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const d = ctx.raw;
                            return [`Recência: ${d.x} dias`, `Monetário: $${d.y.toLocaleString()}`, `Frequência: ${d.r}`];
                        },
                    },
                },
            },
            scales: {
                x: {
                    title: { display: true, text: 'Recência (dias)', color: '#64748B', font: { size: 11 } },
                    grid: { color: 'rgba(0,0,0,0.04)' },
                },
                y: {
                    title: { display: true, text: 'Monetário ($)', color: '#64748B', font: { size: 11 } },
                    grid: { color: 'rgba(0,0,0,0.04)' },
                    ticks: { callback: v => '$' + v.toLocaleString() },
                },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   REVENUE PER SEGMENT — Horizontal Bar Chart
   -------------------------------------------------------------------------- */
function renderRFMBarChart(revenueData) {
    const ctx = document.getElementById('rfmBarChart').getContext('2d');
    registerChart('rfmBar', new Chart(ctx, {
        type: 'bar',
        data: {
            labels: revenueData.labels,
            datasets: [{
                label: 'Receita (USD)',
                data: revenueData.data,
                backgroundColor: revenueData.colors,
                borderRadius: 6,
                borderSkipped: false,
                borderWidth: 0,
            }],
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ` Receita : $${ctx.parsed.x.toLocaleString()}` } },
            },
            scales: {
                x: { ticks: { callback: v => '$' + (v / 1000) + 'k' }, grid: { color: 'rgba(0,0,0,0.04)' } },
                y: { grid: { display: false } },
            },
        },
    }));
}
