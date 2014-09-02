/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var Locale = require("../Locale"),
        subString = Locale.getMarks(Locale.SEMICOLON);

    function fix(content) {
        return content.replace(/\s?;/gm, subString);
    }

    exports.fix = fix;
});
