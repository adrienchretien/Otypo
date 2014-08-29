/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    function fix(content) {
        content = content.replace(/---/g, "—");
        content = content.replace(/--/g, "–");

        return content;
    }

    exports.fix = fix;
});
