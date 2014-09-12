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
     * @param {string} rawText - The string to fix.
     * @param {string} [locale] - Secifiy a valid locale id to fix the raw string with.
     * @returns {string} The string fixed.
     */
    function _fixString(rawText, locale) {
        if (typeof rawText === "string") {
            // QuestionMarks and Apostrophe can share the single closing quote
            // character. Searching for a better solution than QuestionMarks
            // precede Apostrophe.
            rawText = QuotationMarks.fix(rawText, locale);
            rawText = Apostrophe.fix(rawText, locale);

            rawText = Colon.fix(rawText, locale);
            rawText = Dashes.fix(rawText, locale);
            rawText = Ellipsis.fix(rawText, locale);
            rawText = ExclamationMark.fix(rawText, locale);
            rawText = QuestionMark.fix(rawText, locale);
            rawText = SemiColon.fix(rawText, locale);
        }

        return rawText;
    }

    exports.fixString = _fixString;
});
