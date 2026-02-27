/* ==========================================================================
   core/config.js — Global Chart.js Configuration
   SuperStorys Analytics Dashboard
   Depends on: core/registry.js (must load before this)
   ========================================================================== */

'use strict';

/**
 * Apply global Chart.js defaults once on startup.
 * These settings are inherited by all chart instances unless overridden locally.
 */
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#64748B';

Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 18;

Chart.defaults.plugins.tooltip.backgroundColor = '#0F172A';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.1)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.titleFont = { family: "'DM Sans', sans-serif", weight: '600', size: 13 };
Chart.defaults.plugins.tooltip.bodyFont = { family: "'DM Sans', sans-serif", size: 12 };
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 10;
