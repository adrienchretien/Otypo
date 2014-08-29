/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    // Constants
    var en_US = [{start: '“', end: '”'}, {start: '‘', end: '’'}],
        // Unsafe characters are narrow no-break space in french quotes.
        fr_FR = [{start: '« ', end: ' »'}, {start: '“', end: '”'}, {start: '‘', end: '’'}];

    var regexp = /\B(["'])(.+?)(\1)\B/gm;

    function _fixMarks(content, marksSets) {
        var nestLevel = -1,
            set = null;

        while (content.match(regexp) && marksSets.length > 0) {
            nestLevel++;
            set = marksSets[nestLevel];
            content = content.replace(regexp, set.start + '$2' + set.end);
        }

        return content;
    }

    function fix(content, locale) {
        if (locale === 'fr_FR' || locale === 'fr') {
            content = _fixMarks(content, fr_FR);
        } else {
            content = _fixMarks(content, en_US);
        }

        return content;
    }

    exports.fix = fix;
});
