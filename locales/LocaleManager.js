/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    "use strict";

    var prefs = require("./LocalePreferences").getManager();

    /**
     * Default locale id constant.
     */
    var DEFAULT_LOCALE_ID = "en-US";

    /**
     * Marks constants used by getMarks().
     */
    var APOSTROPHE = "apostrophe",
        COLON = "colon",
        DASHES = "dashes",
        ELLIPSIS = "ellipsis",
        EXCLAMATIONMARK = "exclamationMark",
        QUESTIONMARK = "questionMark",
        QUOTATIONMARKS = "quotationMarks",
        SEMICOLON = "semicolon";

    // Locale configurations
    var locales = [
        {
            // Infos
            id: "en-GB",
            admittedTags: ["en-GB"],
            // Substrings
            quotationMarks: [{opening: "‘", closing: "’"}, {opening: "“", closing: "”"}]
        },
        {
            // Infos
            id: "en-US",
            admittedTags: ["en", "en-US"],
            // Substrings
            apostrophe: "’",
            colon: ":",
            dashes: {en: "–", em: "—"},
            ellipsis: "…",
            exclamationMark: "!",
            questionMark: "?",
            quotationMarks: [{opening: "“", closing: "”"}, {opening: "‘", closing: "’"}],
            semicolon: ";"
        },
        {
            // Infos
            id: "fr-FR",
            admittedTags: ["fr", "fr-FR"],
            // Substrings
            colon: " :",
            exclamationMark: " !",
            questionMark: " ?",
            quotationMarks: [{opening: "« ", closing: " »"}, {opening: "“", closing: "”"}, {opening: "‘", closing: "’"}],
            semicolon: " ;"
        }
    ];

    /**
     * Get a locale by its id.
     * @param {string} id - A valid locale id string.
     * @return {?object} The corresponding locale or null if the id
     *                   corresponding to any locales.
     */
    function _getLocaleById(id) {
        var locale = null;

        locales.forEach(function (obj) {
            obj.admittedTags.forEach(function (tag) {
                if (tag === id) {
                    locale = obj;
                }
            });
        });

        return locale;
    }

    /**
     * Get the current locale defined as preference or the default locale.
     * @return {object} The locale.
     */
    function _getCurrentLocale() {
        var currentId = prefs.get("locale");
        return _getLocaleById(currentId) || _getLocaleById(DEFAULT_LOCALE_ID);
    }

    /**
     * Get a list of locales id property.
     * @return {array} Array of locales id strings.
     */
    function getLocalesId() {
        var list = [];

        locales.forEach(function (locale) {
            list.push(locale.id);
        });

        return list;
    }

    /**
     * Get the marks from its name. Valid names are one of the constants
     * available in this module.
     *
     * @param {!string} name - Constant defining the mark you want.
     * @param {string} [localeID=currentLocaleId] - Locale id ("en_GB", "en_US" or "fr_FR").
     *
     * @return {string|object|array} Returns a string when it's a simple group of characters,
     *                               an object when it's a set of strings or an array when
     *                               it's a collection of sets.
     */
    function getMarks(name, localeId) {
        var deflt = _getLocaleById(DEFAULT_LOCALE_ID),
            current = _getLocaleById(localeId) || _getCurrentLocale();

        return current[name] || deflt[name];
    }

    exports.DEFAULT_LOCALE_ID = DEFAULT_LOCALE_ID;

    exports.APOSTROPHE        = APOSTROPHE;
    exports.COLON             = COLON;
    exports.DASHES            = DASHES;
    exports.ELLIPSIS          = ELLIPSIS;
    exports.EXCLAMATIONMARK   = EXCLAMATIONMARK;
    exports.QUESTIONMARK      = QUESTIONMARK;
    exports.QUOTATIONMARKS    = QUOTATIONMARKS;
    exports.SEMICOLON         = SEMICOLON;

    exports.getMarks          = getMarks;
    exports.getLocalesId      = getLocalesId;
});
