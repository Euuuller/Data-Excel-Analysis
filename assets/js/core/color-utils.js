/* ==========================================================================
   core/color-utils.js — Color Palette & Gradient Helpers
   SuperStorys Analytics Dashboard
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   BRAND COLOR PALETTE
   -------------------------------------------------------------------------- */

/** Unified colour palette used across all charts and visualisations. */
const COLORS = {
    indigo: '#13145fff',
    teal: '#14B8A6',
    rose: '#F43F5E',
    amber: '#F59E0B',
    purple: '#A855F7',
    emerald: '#10B981',
    orange: '#F97316',
    sky: '#0EA5E9',
    navy: '#1E3A5F',
};

/* --------------------------------------------------------------------------
   COLOR HELPERS
   -------------------------------------------------------------------------- */

/**
 * Converts a hex colour + alpha value to an rgba() string.
 * @param {string} hex   - 6-digit hex colour, e.g. '#4F46E5'
 * @param {number} alpha - Opacity between 0 and 1
 * @returns {string}     - CSS rgba() string
 */
function hexAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Creates a left-to-right linear gradient across a canvas context.
 * @param {CanvasRenderingContext2D} ctx
 * @param {string[]} colors - Colours from left to right
 * @returns {CanvasGradient}
 */
function gradientH(ctx, colors) {
    const g = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    colors.forEach((c, i) => g.addColorStop(i / (colors.length - 1), c));
    return g;
}

/**
 * Creates a top-to-bottom linear gradient on a canvas context.
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} colorTop    - Colour at the top
 * @param {string} colorBottom - Colour at the bottom
 * @returns {CanvasGradient}
 */
function gradientV(ctx, colorTop, colorBottom) {
    const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    g.addColorStop(0, colorTop);
    g.addColorStop(1, colorBottom);
    return g;
}
