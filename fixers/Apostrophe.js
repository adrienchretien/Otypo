/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    function fix(content) {
        return content.replace(/\b'\b/gi, '’');
    }

    exports.fix = fix;
});
