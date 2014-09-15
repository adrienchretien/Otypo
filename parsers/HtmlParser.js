/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    "use strict";

    /**
     * Add description here.
     * @constructor
     * @param {!string} content - Part or a whole HTML document.
     */
    function HtmlParser(content) {
        this.content = content;
        this._dom = this._domGenerator(content);
    }

    /**
     * The content that will be parsed.
     * @type {!string}
     */
    HtmlParser.prototype.content = null;

    /**
     * A XML DOM generated from a HTML content.
     * @type {!Document}
     */
    HtmlParser.prototype._dom = null;

    /**
     * Generate a XML DOM from a given HTML content.
     * @return {Document|string} Returns a DOM tree or the original content if
     *                           it can't be parsed.
     */
    HtmlParser.prototype._domGenerator = function () {
        var parser = new DOMParser(),
            dom,
            mimeType = "application/xml",
            regexp = /^<!doctype html/i;

        dom = parser.parseFromString(this.content, mimeType);

        if (!dom || (dom.body && dom.body.firstChild.nodeName === "parsererror")) {
            throw new Error("Parser error maybe due to an invalid document or small caps doctype.");
        }

        return dom;
    };

    /**
     * Browse all child nodes and call the callback function on each text nodes.
     * A locale tag value is given as argument in addition to text node value.
     * @param {array} childNodes - Element.childNodes value.
     * @param {function} callback - Callback function getting a text node value
     *                              as first argument and an optional locale
     *                              tag as second argument.
     * @param {string} [locale] - A locale tag.
     */
    HtmlParser.prototype._eachTextChildNodes = function (childNodes, callback, locale) {
        var i,
            len = childNodes.length;

        for (i = 0; i < len; i++) {
            var node = childNodes[i];

            if (node.hasAttribute && node.hasAttribute("lang")) {
                var lang = node.getAttribute("lang");
                locale = lang;
            }

            if (node.nodeType === 3) {
                node.nodeValue = callback(node.nodeValue, locale);
            } else if (node.childNodes.length > 0) {
                this._eachTextChildNodes(node.childNodes, callback, locale);
            }
        }
    };

    /**
     * Parse a HTML and apply the callback function to text nodes.
     * @param {function} callback - Callback function getting a text node value
     *                              as first argument and an optional locale
     *                              tag as second argument.
     * @return {HtmlParser} The HtmlParser instance.
     */
    HtmlParser.prototype.each = function (callback) {
        this._eachTextChildNodes(this._dom.childNodes, callback);
        return this;
    };

    /**
     * Serialize the HTML DOM.
     * @return {string} The serialized DOM.
     */
    HtmlParser.prototype.serialize = function () {
        var serializer = new XMLSerializer(),
            str = serializer.serializeToString(this._dom),
            regexp = /(^<!DOCTYPE .+?>)(<)/;

        // Fix a strange and obscure thing : when serializing the dom,
        // the doctype and the html element are on the same line and
        // this insert a new line between those two. Maybe not the best way.
        str = str.replace(regexp, "$1\n$2");

        return str;
    };

    exports.HtmlParser = HtmlParser;
});
