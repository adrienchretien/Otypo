/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var Locale = require("../Locale"),
        emSubString = Locale.getMarks(Locale.DASHES).em,
        enSubString = Locale.getMarks(Locale.DASHES).en;

    function fix(content) {
        content = content.replace(/---/g, emSubString);
        content = content.replace(/--/g, enSubString);

        return content;
    }

    exports.fix = fix;
});
