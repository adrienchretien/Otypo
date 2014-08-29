/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    function fix(content, locale) {
        if (locale === "fr" || locale === "fr_FR") {
            content = content.replace(/\s?:\s?(?=\D)/, " : ");
        }

        return content;
    }

    exports.fix = fix;
});
