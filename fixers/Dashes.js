/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var Locale = require("../Locale");

    /**
     * Fix a content dashes.
     * @param {string} content - String to fix.
     * @param {string} [locale] - Valid locale id. Used to fix a content with
     *                            specific locale. Else the locale specified
     *                            as prefered is used.
     * @return {string} - Content fixed.
     */
    function fix(content, locale) {
        var emSubString = Locale.getMarks(Locale.DASHES, locale).em,
            enSubString = Locale.getMarks(Locale.DASHES, locale).en;

        content = content.replace(/---/g, emSubString);
        content = content.replace(/--/g, enSubString);

        return content;
    }

    exports.fix = fix;
});
