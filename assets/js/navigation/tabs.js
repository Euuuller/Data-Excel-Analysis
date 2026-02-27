/* ==========================================================================
   navigation/tabs.js — Tab Switching & Lazy Chart Initialisation
   SuperStorys Analytics Dashboard
   Depends on: core/registry.js, all chart index.js files, navigation/sidebar.js
   ========================================================================== */

'use strict';

/**
 * Activates the given tab and lazily initialises its charts if not yet rendered.
 *
 * @param {string} tabId - The `data-tab` attribute value of the target tab panel.
 */
function switchTab(tabId) {
    // Deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // Activate the matching nav item
    const activeNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Hide all tab panels, show the target
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    // Lazy-initialise charts — each tab is rendered only once on first visit
    if (tabId === 'tab-cohort' && !chartRegistry['cohortLine']) initCohortCharts();
    if (tabId === 'tab-rfm' && !chartRegistry['rfmScatter']) initRFMCharts();
    if (tabId === 'tab-descriptive' && !chartRegistry['descLine']) initDescriptiveCharts();
    if (tabId === 'tab-descriptive2' && !chartRegistry['descLine2']) initDescriptiveCharts2();
    if (tabId === 'tab-performance' && !chartRegistry['perfLine']) initPerformanceCharts();
}

/**
 * Binds click events on all `.nav-item` elements to `switchTab`.
 * Called once on DOMContentLoaded via main.js.
 */
function initNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            switchTab(item.dataset.tab);
            closeSidebar(); // close mobile sidebar after navigation
        });
    });
}
