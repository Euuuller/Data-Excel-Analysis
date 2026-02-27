/* ==========================================================================
   charts/performance/index.js — Performance Analysis Charts Orchestrator
   SuperStorys Analytics Dashboard
   Depends on: core/registry.js, core/color-utils.js
   Data source: assets/data/performance.json
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   ENTRY POINT
   -------------------------------------------------------------------------- */

/**
 * Fetches performance data and initialises all Performance Analysis charts.
 * Called lazily when the Performance tab is activated for the first time.
 */
function initPerformanceCharts() {
    fetch('assets/data/performance.json')
        .then(r => r.json())
        .then(data => {
            renderPerfLineChart(data);
            renderPerfMarginChart(data);
            renderPerfYoYChart(data);
            renderPerfChannelChart(data);
            renderPerfCacLtvChart(data);
        })
        .catch(err => console.error('[Performance] Failed to load data:', err));
}

/* --------------------------------------------------------------------------
   REVENUE vs TARGET vs PROFIT — Line Chart
   -------------------------------------------------------------------------- */
function renderPerfLineChart(data) {
    const ctx = document.getElementById('perfLineChart').getContext('2d');
    const profGrad = ctx.createLinearGradient(0, 0, 0, 300);
    profGrad.addColorStop(0, hexAlpha(COLORS.emerald, 0.25));
    profGrad.addColorStop(1, hexAlpha(COLORS.emerald, 0.0));

    registerChart('perfLine', new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Receita Real', data: data.revenue, borderColor: COLORS.indigo, borderWidth: 2.5, pointBackgroundColor: COLORS.indigo, pointRadius: 4, tension: 0.4, fill: false },
                { label: 'Meta', data: data.target, borderColor: COLORS.amber, borderWidth: 2, borderDash: [6, 4], pointRadius: 0, tension: 0.4, fill: false },
                { label: 'Lucro', data: data.profit, borderColor: COLORS.emerald, backgroundColor: profGrad, borderWidth: 2, fill: true, tension: 0.4, pointRadius: 3 },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.y.toLocaleString()}` } },
            },
            scales: {
                y: { ticks: { callback: v => '$' + (v / 1000) + 'k' }, grid: { color: 'rgba(0,0,0,0.04)' } },
                x: { grid: { display: false } },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   MARGIN BY CATEGORY — Radar Chart
   -------------------------------------------------------------------------- */
function renderPerfMarginChart(data) {
    const ctx = document.getElementById('perfMarginChart').getContext('2d');
    registerChart('perfMargin', new Chart(ctx, {
        type: 'radar',
        data: {
            labels: data.margin.labels,
            datasets: [
                { label: '2022', data: data.margin.data2022, borderColor: hexAlpha(COLORS.indigo, 0.6), backgroundColor: hexAlpha(COLORS.indigo, 0.08), borderWidth: 2, pointRadius: 3 },
                { label: '2023', data: data.margin.data2023, borderColor: COLORS.teal, backgroundColor: hexAlpha(COLORS.teal, 0.08), borderWidth: 2, pointRadius: 3 },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: ctx => ` ${ctx.raw}%` } },
            },
            scales: {
                r: { min: 0, max: 60, ticks: { callback: v => v + '%', stepSize: 20, backdropColor: 'transparent' }, grid: { color: 'rgba(0,0,0,0.06)' } },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   YEAR-OVER-YEAR GROWTH — Bar Chart
   -------------------------------------------------------------------------- */
function renderPerfYoYChart(data) {
    const ctx = document.getElementById('perfYoYChart').getContext('2d');
    const yoyColors = data.yoyGrowth.data.map(v =>
        v >= 20 ? COLORS.emerald : v >= 15 ? COLORS.teal : COLORS.indigo
    );

    registerChart('perfYoY', new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.yoyGrowth.labels,
            datasets: [{ label: 'Crescimento YoY (%)', data: data.yoyGrowth.data, backgroundColor: yoyColors, borderRadius: 6, borderSkipped: false }],
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ` +${ctx.parsed.y}%` } },
            },
            scales: {
                y: { ticks: { callback: v => v + '%' }, grid: { color: 'rgba(0,0,0,0.04)' } },
                x: { grid: { display: false }, ticks: { maxRotation: 45, font: { size: 10 } } },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   CONVERSION BY CHANNEL — Polar Area Chart
   -------------------------------------------------------------------------- */
function renderPerfChannelChart(data) {
    const ctx = document.getElementById('perfChannelChart').getContext('2d');
    registerChart('perfChannel', new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: data.channels.labels,
            datasets: [{
                data: data.channels.conversionRate,
                backgroundColor: [
                    hexAlpha(COLORS.indigo, 0.75),
                    hexAlpha(COLORS.teal, 0.75),
                    hexAlpha(COLORS.amber, 0.75),
                    hexAlpha(COLORS.rose, 0.75),
                    hexAlpha(COLORS.purple, 0.75),
                ],
                borderWidth: 0,
            }],
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 12 } },
                tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` } },
            },
            scales: { r: { ticks: { backdropColor: 'transparent', font: { size: 9 } } } },
        },
    }));
}

/* --------------------------------------------------------------------------
   CAC vs LTV — Grouped Bar Chart
   -------------------------------------------------------------------------- */
function renderPerfCacLtvChart(data) {
    const ctx = document.getElementById('perfCacLtvChart').getContext('2d');
    registerChart('perfCacLtv', new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.channels.labels,
            datasets: [
                { label: 'LTV ($)', data: data.channels.ltv, backgroundColor: COLORS.indigo, borderRadius: 4, borderSkipped: false },
                { label: 'CAC ($)', data: data.channels.cac, backgroundColor: COLORS.rose, borderRadius: 4, borderSkipped: false },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: $${ctx.parsed.y}` } },
            },
            scales: {
                y: { ticks: { callback: v => '$' + v }, grid: { color: 'rgba(0,0,0,0.04)' } },
                x: { grid: { display: false } },
            },
        },
    }));
}
