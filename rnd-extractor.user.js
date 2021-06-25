// ==UserScript==
// @name         RND Extractor
// @namespace    https://fabian-haenchen.de
// @version      0.5
// @description  Extract hidden content from news sites belonging to the Redationsnetwerk Deutschland
// @author       haenchen
// @match        https://www.dnn.de/*
// @match        https://m.dnn.de/*
// @match        https://www.haz.de/*
// @match        https://m.haz.de/*
// @match        https://www.neuepresse.de/*
// @match        https://m.neuepresse.de/*
// @match        https://www.lvz.de/*
// @match        https://m.lvz.de/*
// @match        https://www.maz-online.de/*
// @match        https://m.maz-online.de/*
// @match        https://www.ln-online.de/*
// @match        https://m.ln-online.de/*
// @downloadURL  https://raw.githubusercontent.com/haenchen/userscripts/master/rnd-extractor.user.js
// @updateURL    https://raw.githubusercontent.com/haenchen/userscripts/master/rnd-extractor.user.js
// @grant        none
// ==/UserScript==

if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

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
    var article = json.articleBody;

    // This is experimental and may be horrible
    var index = article.indexOf('Liveticker:') + 'Liveticker:'.length;
    var trueindex = index;
    if (index) {
      var remain = article.substr(index);
      while ((index = remain.search(/(\d{1,2}\.){2}(\d{2}|\d{4})\s(\d+:\d+)/)) != -1) {
        trueindex += index;
        article = article.splice(trueindex, 0, '<br><br>');

        // No need to include the same date (min length: 14 chars) and <br><br> again
        trueindex += 22;
        if (trueindex > article.length) {
          break;
        }
        remain = article.substr(trueindex);
      }
    }

    content.innerHTML = article;
    div.appendChild(content);
    div.setAttribute('style', 'text-align: justify !important; line-height: 2;');
  }
})();
