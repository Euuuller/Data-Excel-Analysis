/* ==========================================================================
   charts/cohort/index.js — Cohort Tab Chart Orchestrator
   SuperStorys Analytics Dashboard
   Depends on: core/registry.js, core/color-utils.js, charts/cohort/heatmap.js
   Data source: assets/data/cohort.json
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   ENTRY POINT
   -------------------------------------------------------------------------- */

/**
 * Fetches cohort data and initialises all Cohort Analysis charts.
 * Called lazily when the Cohort tab is activated for the first time.
 */
function initCohortCharts() {
    fetch('assets/data/cohort.json')
        .then(r => r.json())
        .then(data => {
            initCohortHeatmap(data);
            renderCohortLineChart(data);
            renderCohortBarChart(data);
        })
        .catch(err => console.error('[Cohort] Failed to load data:', err));
}

/* --------------------------------------------------------------------------
   AVERAGE RETENTION LINE CHART
   -------------------------------------------------------------------------- */
function renderCohortLineChart(cohortData) {
    // Compute average retention per month across all cohorts
    const avgRetention = [];
    for (let m = 0; m < 12; m++) {
        let sum = 0, cnt = 0;
        cohortData.retention.forEach(row => {
            if (row[m] !== undefined) { sum += row[m]; cnt++; }
        });
        avgRetention.push(cnt ? Math.round(sum / cnt) : null);
    }

    const ctx = document.getElementById('cohortLineChart').getContext('2d');
    const gradLine = gradientV(ctx, hexAlpha(COLORS.indigo, 0.3), hexAlpha(COLORS.indigo, 0.0));

    registerChart('cohortLine', new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11'],
            datasets: [{
                label: 'Retenção Média (%)',
                data: avgRetention,
                borderColor: COLORS.indigo,
                backgroundColor: gradLine,
                borderWidth: 2.5,
                pointBackgroundColor: COLORS.indigo,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.4,
                spanGaps: true,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y}%` } },
            },
            scales: {
                y: { min: 0, max: 100, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(0,0,0,0.04)' } },
                x: { grid: { display: false } },
            },
        },
    }));
}

/* --------------------------------------------------------------------------
   USERS PER COHORT BAR CHART
   -------------------------------------------------------------------------- */
function renderCohortBarChart(cohortData) {
    const ctx = document.getElementById('cohortBarChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, COLORS.teal);
    gradient.addColorStop(1, hexAlpha(COLORS.teal, 0.4));

    registerChart('cohortBar', new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cohortData.months,
            datasets: [{
                label: 'Novos Usuários',
                data: cohortData.users,
                backgroundColor: gradient,
                borderRadius: 6,
                borderSkipped: false,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y.toLocaleString('pt-BR')} usuários` } },
            },
            scales: {
                y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: v => (v / 1000).toFixed(0) + 'K' } },
                x: { grid: { display: false }, ticks: { maxRotation: 45 } },
            },
        },
    }));
}
