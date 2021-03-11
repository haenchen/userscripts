// ==UserScript==
// @name         Teamweb CSS fixer
// @namespace    https://fabian-haenchen.de
// @version      0.2
// @description  Shortens top navigation to prevent unneccessary horizontal overflow
// @author       haenchen
// @match        https://[your teamweb url]/*
// ==/UserScript==

/*eslint-env jquery */
(function() {
    'use strict';

    $('nav[id=nav], ul[id=navigation]').slice(0,2).width('inherit')
})();
