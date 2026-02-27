/* ==========================================================================
   navigation/sidebar.js — Sidebar Open / Close / Mobile Overlay
   SuperStorys Analytics Dashboard
   ========================================================================== */

'use strict';

/** Opens the sidebar and shows the overlay on mobile. */
function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.remove('hidden');
}

/** Closes the sidebar and hides the overlay on mobile. */
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.add('hidden');
}

/**
 * Binds sidebar open/close events to the hamburger, overlay and close button.
 * Called once on DOMContentLoaded via main.js.
 */
function initSidebarMobile() {
    const ham = document.getElementById('hamburger');
    const overlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('sidebarClose');

    if (ham) ham.addEventListener('click', openSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
}
