/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    "use strict";

    /**
     * DOM parser.
     * @return {dom} Returns a DOM or null if the content is invalid.
     */
    function domParser(content) {
        var parser = new DOMParser(),
            dom;
        try {
            dom = parser.parseFromString(content, "text/xml");

            if (dom.documentElement.nodeName === "parsererror") {
                throw new Error("Invalid document.");
            }
        } catch (e) {
            dom = null;
        }

        return dom;
    }

    /**
     * DOM serializer.
     */
    function domSerializer(dom) {
        var serializer = new XMLSerializer();
        return serializer.serializeToString(dom);
    }

    /**
     * Recursive function. For each child text nodes the callback function is called.
     */
    function forEchChildNodes(childNodes, callback) {
        var i,
            len = childNodes.length;

        for (i = 0; i < len; i++) {
            var node = childNodes[i];
            if (node.nodeType === 3) {
                node.nodeValue = callback(node.nodeValue);
            } else if (node.childNodes.length > 0) {
                forEchChildNodes(node.childNodes, callback);
            }
        }
    }

    /**
     * Parse a HTML string and apply the callback function to text nodes.
     */
    function parse(content, callback) {
        var dom = domParser(content);

        forEchChildNodes(dom.childNodes, callback);

        var s = domSerializer(dom);
        console.log(s);
        return s;
    }

    exports.parse = parse;
});
