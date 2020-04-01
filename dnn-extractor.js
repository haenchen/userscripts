// ==UserScript==
// @name         DNN Extractor
// @namespace    https://fabian-haenchen.de
// @version      0.3
// @description  Extract hidden content
// @author       haenchen
// @match        https://www.dnn.de/*
// @match        https://m.dnn.de/*
// ==/UserScript==
(function () {
  'use strict';
  var scripts = document.getElementsByTagName('script');
  for (var element of scripts) {
    if (element.getAttribute('type') !== 'application/ld+json') {
      continue;
    }
    if (!element.innerText.includes("articleBody")) {
      continue;
    }
    var text = element.innerText;
    var json = window.JSON.parse(text.substring(1, text.length -1));
    var div = document.getElementsByClassName('pdb-article-body')[0];
    if (!div.innerHTML.match(/paidcontent/g)) {
      return;
    }
    div.innerHTML = '';
    var content = document.createElement('div');
    content.classList.add('pdb-richtext-field');
    content.innerHTML = json.articleBody;
    div.appendChild(content);
  }
})();
