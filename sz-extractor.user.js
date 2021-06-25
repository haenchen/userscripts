// ==UserScript==
// @name         SZ Extractor
// @namespace    https://fabian-haenchen.de
// @version      0.1
// @description  Extract hidden content from Sächsiche Zeitung (saechsische.de)
// @author       haenchen
// @match        https://www.saechsische.de/*
// @icon         https://www.google.com/s2/favicons?domain=saechsische.de
// @downloadURL  https://raw.githubusercontent.com/haenchen/userscripts/master/sz-extractor.js
// @updateURL    https://raw.githubusercontent.com/haenchen/userscripts/master/sz-extractor.js
// @grant        none
// ==/UserScript==

/*eslint-env jquery */
(function() {
    'use strict';

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === "class") {
          var attributeValue = $(mutation.target).prop(mutation.attributeName);
          if (attributeValue.includes('display-none')) {
            $(mutation.target).removeClass('display-none');
          }
        }
      })
    });

    observer.observe($('#article-content-bottom')[0], {
      attributes: true
    });

    $('#article-fadeout').remove();
    $('#piano-inline').remove();
})();
