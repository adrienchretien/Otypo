/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var LocaleManager = require("../locales/LocaleManager");

    /**
     * Fix a content apostrophes.
     * @param {string} content - String to fix.
     * @param {string} [locale] - Valid locale id. Used to fix a content with
     *                            specific locale. Else the locale specified
     *                            as prefered is used.
     * @return {string} - Content fixed.
     */
    function fix(content, locale) {
        var subString = LocaleManager.getMarks(LocaleManager.APOSTROPHE, locale);
        return content.replace(/\b'\b/g, subString);
    }

    exports.fix = fix;
});
