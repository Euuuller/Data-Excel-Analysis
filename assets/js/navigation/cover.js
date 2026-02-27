/* ==========================================================================
   navigation/cover.js — Cover Screen Transition & Business Date
   SuperStorys Analytics Dashboard
   ========================================================================== */

'use strict';

/**
 * Binds the "Enter Dashboard" button on the cover screen.
 * Fades out the cover and initialises the default tab's charts.
 */
function initCover() {
    const btn = document.getElementById('btnEnter');
    const cover = document.getElementById('cover');
    const app = document.getElementById('app');

    btn.addEventListener('click', () => {
        cover.classList.add('fade-out');
        setTimeout(() => {
            cover.style.display = 'none';
            app.classList.remove('hidden');
            // Initialise the first visible tab (Cohort is active by default after cover)
            initBusinessDate();
            initCohortCharts();
        }, 600);
    });
}

/**
 * Writes the current locale date into the Business Problem tab header.
 * Format: "27 de fevereiro de 2026"
 */
function initBusinessDate() {
    const el = document.getElementById('currentDate');
    if (!el) return;
    el.textContent = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric',
    });
}
