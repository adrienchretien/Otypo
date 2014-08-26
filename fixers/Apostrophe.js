/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
	"use strict";
	
    function fix(content) {
        return content.replace(/(\w+)'(\w)/gi, '$1’$2');
    }
    
	exports.fix = fix;
});