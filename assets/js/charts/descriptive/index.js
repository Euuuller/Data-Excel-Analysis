/* ==========================================================================
   charts/descriptive/index.js — Descriptive Analysis Tab I Orchestrator
   SuperStorys Analytics Dashboard
   Depends on: core/registry.js, core/color-utils.js, charts/descriptive/us-map.js
   Data source: assets/data/descriptive.json
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   ENTRY POINT
   -------------------------------------------------------------------------- */

/**
 * Fetches descriptive data and initialises all Descriptive Analysis (Tab I) charts.
 * Called lazily when the tab is activated for the first time.
 */
function initDescriptiveCharts() {
    fetch('assets/data/descriptive.json')
        .then(r => r.json())
        .then(data => {
            renderDescLineChart(data, 'descLineChart', 'descLine');
            initUSMap(data.stateSales, 'usMap', 'mapGrad');
            renderDescDonutChart(data, 'descDonutChart', 'descDonut');
            renderDescTopProducts(data, 'descTopProducts', 'descProd');
            renderDescReturnChart(data, 'descReturnChart', 'descReturn');
        })
        .catch(err => console.error('[Descriptive] Failed to load data:', err));
}

/* --------------------------------------------------------------------------
   MULTI-YEAR REVENUE LINE CHART
   Shared with Tab II via parameterised canvas ID and registry key.
   -------------------------------------------------------------------------- */
function renderDescLineChart(data, canvasId, registryKey) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    const makeGrad = (gradCtx, color) => {
        const g = gradCtx.createLinearGradient(0, 0, 0, gradCtx.canvas.height || 300);
        g.addColorStop(0, hexAlpha(color, 0.25));
        g.addColorStop(1, hexAlpha(color, 0.0));
        return g;
    };

    registerChart(registryKey, new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.months,
            datasets: [
                { label: '2020', data: data.revenue['2020'], borderColor: hexAlpha(COLORS.indigo, 0.5), backgroundColor: 'transparent', borderWidth: 2, pointRadius: 3, tension: 0.4 },
                { label: '2021', data: data.revenue['2021'], borderColor: hexAlpha(COLORS.teal, 0.6), backgroundColor: 'transparent', borderWidth: 2, pointRadius: 3, tension: 0.4 },
                { label: '2022', data: data.revenue['2022'], borderColor: COLORS.amber, backgroundColor: 'transparent', borderWidth: 2, pointRadius: 3, tension: 0.4 },
                { label: '2023', data: data.revenue['2023'], borderColor: COLORS.indigo, backgroundColor: makeGrad(ctx, COLORS.indigo), fill: true, borderWidth: 2.5, pointRadius: 4, tension: 0.4 },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.y.toLocaleString()} USD` } },
            },
            scales: {
                y: { ticks: { callback: v => '$' + (v / 1000) + 'k' }, grid: { color: 'rgba(0,0,0,0.04)' } },
                x: { grid: { display: false } },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   CATEGORY DONUT CHART
   Shared with Tab II via parameterised IDs.
   -------------------------------------------------------------------------- */
function renderDescDonutChart(data, canvasId, registryKey) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    registerChart(registryKey, new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.categories.labels,
            datasets: [{
                data: data.categories.data,
                backgroundColor: [COLORS.indigo, COLORS.sky, COLORS.emerald, COLORS.amber],
                borderWidth: 0,
                hoverOffset: 8,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '68%',
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   TOP 5 PRODUCTS HORIZONTAL BAR
   Shared with Tab II via parameterised IDs.
   -------------------------------------------------------------------------- */
function renderDescTopProducts(data, canvasId, registryKey) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    registerChart(registryKey, new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.topProducts.labels,
            datasets: [{
                label: 'Vendas',
                data: data.topProducts.data,
                backgroundColor: [COLORS.indigo, COLORS.sky, COLORS.teal, COLORS.purple, COLORS.emerald],
                borderRadius: 6,
                borderSkipped: false,
            }],
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ` Vendas : $${ctx.parsed.x.toLocaleString()}` } },
            },
            scales: {
                x: { ticks: { callback: v => '$' + (v / 1000) + 'k' }, grid: { color: 'rgba(0,0,0,0.04)' } },
                y: { grid: { display: false } },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   RETURN RATE LINE CHART
   Shared with Tab II via parameterised IDs.
   -------------------------------------------------------------------------- */
function renderDescReturnChart(data, canvasId, registryKey) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    registerChart(registryKey, new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.returnRate.labels,
            datasets: [
                { label: 'Devoluções', data: data.returnRate.returns, borderColor: COLORS.rose, backgroundColor: hexAlpha(COLORS.rose, 0.08), fill: true, borderWidth: 2, tension: 0, pointRadius: 4 },
                { label: 'Vendas', data: data.returnRate.sales, borderColor: COLORS.emerald, backgroundColor: 'transparent', borderWidth: 2, tension: 0, pointRadius: 4, borderDash: [5, 3] },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}` } },
            },
            scales: {
                y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: v => v.toLocaleString() } },
                x: { grid: { display: false } },
            },
        },
    }));
}
