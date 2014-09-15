/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var LocaleManager = require("../locales/LocaleManager");

    /**
     * Fix a content dashes.
     * @param {string} content - String to fix.
     * @param {string} [locale] - Valid locale id. Used to fix a content with
     *                            specific locale. Else the locale specified
     *                            as prefered is used.
     * @return {string} - Content fixed.
     */
    function fix(content, locale) {
        var emSubString = LocaleManager.getMarks(LocaleManager.DASHES, locale).em,
            enSubString = LocaleManager.getMarks(LocaleManager.DASHES, locale).en;

        content = content.replace(/---/g, emSubString);
        content = content.replace(/--/g, enSubString);

        return content;
    }

    exports.fix = fix;
});
