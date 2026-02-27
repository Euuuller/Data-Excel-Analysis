/* ==========================================================================
   charts/descriptive2/index.js — Descriptive Analysis Tab II Orchestrator
   SuperStorys Analytics Dashboard
   Depends on: charts/descriptive/index.js (shared render functions),
               charts/descriptive/us-map.js (initUSMap)
   Data source: assets/data/descriptive2.json
   ========================================================================== */

'use strict';

/**
 * Fetches descriptive2 data and initialises all Tab II charts.
 * Reuses the same render functions as Tab I; canvas IDs are suffixed with '2'.
 * Called lazily when the tab is activated for the first time.
 */
function initDescriptiveCharts2() {
    fetch('assets/data/descriptive2.json')
        .then(r => r.json())
        .then(data => {
            renderDescLineChart(data, 'descLineChart2', 'descLine2');
            initUSMap(data.stateSales, 'usMap2', 'mapGrad2');
            renderDescDonutChart(data, 'descDonutChart2', 'descDonut2');
            renderDescTopProducts(data, 'descTopProducts2', 'descProd2');
            renderDescReturnChart(data, 'descReturnChart2', 'descReturn2');
        })
        .catch(err => console.error('[Descriptive2] Failed to load data:', err));
}
