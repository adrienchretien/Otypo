/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var Locale = require("../Locale"),
        marks = Locale.getMarks(Locale.QUOTATIONMARKS);

    function fix(content, locale) {
        var length = marks.length,
            nestLevel = 0,
            regexp = /\B(["'])(.*)(\1)\B/gm,
            set;

        while (content.match(regexp) && length > 0 && nestLevel < length) {
            set = marks[nestLevel];
            console.log(set);
            content = content.replace(regexp, set.opening + '$2' + set.closing);
            nestLevel++;
        }

        return content;
    }

    exports.fix = fix;
});
