/* ==========================================================================
   main.js — Application Bootstrap
   SuperStorys Analytics Dashboard
   Load order (see index.html):
     core/registry.js → core/color-utils.js → core/config.js →
     charts/* → navigation/* → main.js
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initCover();         // navigation/cover.js
    initNav();           // navigation/tabs.js
    initSidebarMobile(); // navigation/sidebar.js
});
