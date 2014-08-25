/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    // Constants
    var en_US = [{start: '“', end: '”'}, {start: '‘', end: '’'}],
        // Unsafe characters are no-no-breakspace in angled quotation
        // marks.
        fr_FR = [{start: '« ', end: ' »'}, {start: '“', end: '”'}, {start: '‘', end: '’'}];

    var regexp = /(?:^|\s)(['"])(.*)(\1)(?:\s|$)/;

    function _fixMarks(content, marksSets) {
        while (content.match(regexp) && marksSets.length > 0) {
            var set = marksSets.shift();
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