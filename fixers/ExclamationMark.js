/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    /**
     * Fix a content exclamation marks.
     * @param {string} content - String to fix.
     * @param {string} [locale] - Valid locale id. Used to fix a content with
     *                            specific locale. Else the locale specified
     *                            as prefered is used.
     * @return {string} - Content fixed.
     */
    var Locale = require("../Locale");

    function fix(content, locale) {
        var subString = Locale.getMarks(Locale.EXCLAMATIONMARK, locale);
        return content.replace(/\s?!/gm, subString);
    }

    exports.fix = fix;
});
