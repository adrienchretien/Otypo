/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    function fix(content, locale) {
        var nestLevel = -1,
            regexp = /\B(["'])(.+?)(\1)\B/gm,
            set = [{start: '“', end: '”'}, {start: '‘', end: '’'}];

        while (content.match(regexp) && marksSets.length > 0) {
            nestLevel++;
            set = marksSets[nestLevel];
            content = content.replace(regexp, set.start + '$2' + set.end);
        }

        return content;
    }

    exports.fix = fix;
});
