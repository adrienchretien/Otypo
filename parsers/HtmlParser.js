/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    "use strict";

    /**
     * DOM parser.
     * @param {string} content - A HTML document as string.
     * @return {Document|string} Returns a DOM tree or the original content if
     *                           it can't be parsed.
     */
    function domParser(content) {
        var parser = new DOMParser(),
            dom,
            mimeType = "application/xml",
            regexp = /^<!doctype html/i;

        try {
            dom = parser.parseFromString(content, mimeType);

            if (!dom || (dom.body && dom.body.firstChild.nodeName === "parsererror")) {
                throw new Error("Parser error maybe due to an invalid document or small caps doctype.");
            }
        } catch (e) {
            console.warn("Error while parsing html content, message: " + e.message);
            dom = content;
        }

        return dom;
    }

    /**
     * DOM serializer.
     * @param {Document} dom - DOM tree to serialize.
     */
    function domSerializer(dom) {
        var serializer = new XMLSerializer(),
            str = serializer.serializeToString(dom),
            regexp = /(^<!DOCTYPE .+?>)(<)/;

        // Fix a strange and obscure thing : when serializing the dom,
        // the doctype and the html element are on the same line and
        // this insert a new line between those two. Maybe not the best way.
        str = str.replace(regexp, "$1\n$2");

        return str;
    }

    /**
     * Recursive function. For each child text nodes the callback function is called.
     */
    function forEachChildNodes(childNodes, callback, locale) {
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
                forEachChildNodes(node.childNodes, callback, locale);
            }
        }
    }

    /**
     * Parse a HTML string and apply the callback function to text nodes.
     */
    function parse(content, callback) {
        var dom = domParser(content);

        if (typeof dom !== "string") {
            forEachChildNodes(dom.childNodes, callback);
            dom = domSerializer(dom);
        }

        return dom;
    }

    exports.parse = parse;
});
