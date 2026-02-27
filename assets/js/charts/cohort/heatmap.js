/* ==========================================================================
   charts/cohort/heatmap.js — Cohort Retention Heatmap Table Renderer
   SuperStorys Analytics Dashboard
   Depends on: core/color-utils.js (hexAlpha, COLORS)
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   HEATMAP COLOUR SCALE
   -------------------------------------------------------------------------- */

/**
 * Linearly interpolates between two hex colours.
 * @param {string} c1 - Start hex colour
 * @param {string} c2 - End hex colour
 * @param {number} t  - Interpolation factor [0, 1]
 * @returns {string}  - CSS rgb() colour
 */
function lerpColor(c1, c2, t) {
    const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
    const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
    return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

/**
 * Maps a retention percentage (0–100) to an indigo gradient colour.
 * @param {number} pct - Retention percentage
 * @returns {string}   - CSS colour
 */
function heatmapColor(pct) {
    const p = pct / 100;
    if (p >= 0.75) return lerpColor('#4338CA', '#1E1B4B', (p - 0.75) / 0.25);
    if (p >= 0.40) return lerpColor('#818CF8', '#4338CA', (p - 0.40) / 0.35);
    return lerpColor('#EEF2FF', '#818CF8', p / 0.4);
}

/**
 * Returns a readable foreground colour for a given background retention pct.
 * @param {number} pct
 * @returns {string} - '#fff' or '#334155'
 */
function textColorForBg(pct) {
    return pct >= 35 ? '#fff' : '#334155';
}

/* --------------------------------------------------------------------------
   TABLE BUILDER
   -------------------------------------------------------------------------- */

/**
 * Builds and injects the cohort retention heatmap table into #heatmapContainer.
 * Protected by a `dataset.built` flag so it only runs once.
 *
 * @param {object} cohortData - Parsed cohort.json payload
 */
function initCohortHeatmap(cohortData) {
    const container = document.getElementById('heatmapContainer');
    if (!container || container.dataset.built) return;
    container.dataset.built = '1';

    const monthLabels = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11'];

    let html = `<table class="heatmap-table">
    <thead><tr>
      <th>Cohort</th>
      <th style="text-align:right">Usuários</th>
      ${monthLabels.map(m => `<th>${m}</th>`).join('')}
    </tr></thead>
    <tbody>`;

    cohortData.months.forEach((month, i) => {
        const users = cohortData.users[i].toLocaleString('pt-BR');
        const row = cohortData.retention[i];

        html += `<tr>
      <td>${month}</td>
      <td style="text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:#64748B">${users}</td>`;

        monthLabels.forEach((_, j) => {
            if (j < row.length) {
                const pct = row[j];
                html += `<td class="hm-cell"
                     style="background:${heatmapColor(pct)};color:${textColorForBg(pct)}"
                     title="${month} · M${j}: ${pct}%">${pct}%</td>`;
            } else {
                html += `<td></td>`;
            }
        });

        html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}
