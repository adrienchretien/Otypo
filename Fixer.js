/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    "use strict";

    // Fixers
    var Apostrophe      = require('fixers/Apostrophe'),
        Colon           = require('fixers/Colon'),
        Dashes          = require('fixers/Dashes'),
        Ellipsis        = require('fixers/Ellipsis'),
        ExclamationMark = require('fixers/ExclamationMark'),
        QuestionMark    = require('fixers/QuestionMark'),
        QuotationMarks  = require('fixers/QuotationMarks'),
        SemiColon       = require('fixers/SemiColon');

    /**
     * Fix typographical syntax on a string.
     * @param {string} rawText The string to fix.
     * @returns {string} The string fixed.
     */
    function _fixString(rawText) {
        if (typeof rawText === "string") {
            // QuestionMarks and Apostrophe can share the single closing quote
            // character. Searching for a better solution than QuestionMarks
            // precede Apostrophe.
            rawText = QuotationMarks.fix(rawText);
            rawText = Apostrophe.fix(rawText);

            rawText = Colon.fix(rawText);
            rawText = Dashes.fix(rawText);
            rawText = Ellipsis.fix(rawText);
            rawText = ExclamationMark.fix(rawText);
            rawText = QuestionMark.fix(rawText);
            rawText = SemiColon.fix(rawText);
        }

        return rawText;
    }

    exports.fixString = _fixString;
});
