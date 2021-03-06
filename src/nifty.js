(function (w, d) {
    "use strict";
    var NIFTY = {};
    NIFTY.html = function (html, data) {
        return NIFTY.replace(html, data).replace(/\{\{[\w\W\.]*\}\}/g, '');
    };

    /**
     * Returns a string with data from object injected into a template.
     * @param {String} tmpl
     * @param {Object} data
     * @returns {String}
     */
    NIFTY.tmpl = function (tmpl, data) {
        return NIFTY.html(d.getElementById(tmpl).innerHTML, data);
    };

    NIFTY.dom = function (tmpl, data) {
        var i, elem = d.createElement('div');
        elem.innerHTML = NIFTY.tmpl(tmpl, data);
        for (i = 0; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].nodeType === Node.ELEMENT_NODE) {
                return elem.childNodes[i];
            }
        }
    };

    NIFTY.replace = function (html, data, parent) {
        var prop, inject;
        parent = parent || '';
        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                if (typeof data[prop] === 'function') {
                    inject = data[prop]();
                    if (typeof inject !== 'string') {
                        inject = '';
                    }
                } else if (typeof data[prop] === 'object') {
                    return NIFTY.replace(html, data[prop], prop + '.');
                } else {
                    inject = data[prop];
                }
                while (html.indexOf('{{' + parent + prop + '}}') !== -1) {
                    html = html.replace('{{' + parent + prop + '}}', inject);
                }
            }
        }
        return html;
    };

    w.NIFTY = NIFTY;

}(window, document));
