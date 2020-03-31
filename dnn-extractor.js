// ==UserScript==
// @name         DNN Extractor
// @namespace    https://fabian-haenchen.de
// @version      0.1
// @description  Extract hidden content
// @author       haenchen
// @match        https://www.dnn.de/*
// ==/UserScript==
(function () {
  'use strict';
  var scripts = document.getElementsByTagName('script');
  for (var element of scripts) {
    if (element.getAttribute('type') !== 'application/ld+json') {
      continue;
    }
    var json = JSON.parse(element.innerHTML);
    if (json['@type'] !== 'NewsArticle') {
      continue;
    }
    var div = document.getElementsByClassName('pdb-article-body')[0];
    div.innerHTML = '';
    var content = document.createElement('div');
    content.classList.add('pdb-richtext-field');
    content.innerHTML = json.articleBody;
    div.appendChild(content);
  }
})();
