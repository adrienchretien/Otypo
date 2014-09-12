/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var Locale = require("../Locale");

    /**
     * Fix a content quotation marks.
     * @param {string} content - String to fix.
     * @param {string} [locale] - Valid locale id. Used to fix a content with
     *                            specific locale. Else the locale specified
     *                            as prefered is used.
     * @return {string} - Content fixed.
     */
    function fix(content, locale) {
        var marks = Locale.getMarks(Locale.QUOTATIONMARKS, locale),
            length = marks.length,
            nestLevel = 0,
            regexp = /\B(["'])(.*)(\1)\B/gm,
            set;

        while (content.match(regexp) && length > 0 && nestLevel < length) {
            set = marks[nestLevel];
            content = content.replace(regexp, set.opening + '$2' + set.closing);
            nestLevel++;
        }

        return content;
    }

    exports.fix = fix;
});
