/* ==========================================================================
   core/registry.js — Chart Instance Registry
   SuperStorys Analytics Dashboard
   ========================================================================== */

'use strict';

/**
 * Central registry for Chart.js instances.
 * Allows previously created charts to be destroyed before re-initialisation,
 * preventing memory leaks and canvas context conflicts.
 *
 * @type {Object.<string, Chart>}
 */
const chartRegistry = {};

/**
 * Registers a new Chart.js instance, destroying any existing one for that ID.
 *
 * @param {string} id       - Unique identifier (matches the canvas element ID)
 * @param {Chart}  instance - The Chart.js instance to register
 */
function registerChart(id, instance) {
    if (chartRegistry[id]) {
        chartRegistry[id].destroy();
    }
    chartRegistry[id] = instance;
}
