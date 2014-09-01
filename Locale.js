/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

/** Extension that fix punctuation in the current document. */
define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var Dialogs            = brackets.getModule("widgets/Dialogs"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        Strings            = brackets.getModule("strings"),
        prefs              = PreferencesManager.getExtensionPrefs("neol.otypo.preferences");

    // Locale modules
    var DialogTemplate = require("text!htmlContent/locale-preferences-dialog.html");

    // Public constants
    var APOSTROPHE = "apostrophe",
        COLON = "colon",
        DASHES = "dashes",
        ELLIPSIS = "ellipsis",
        EXCLAMATIONMARK = "exclamationMark",
        QUESTIONMARK = "questionMark",
        QUOTATIONMARKS = "quotationMarks",
        PARENTHESES = "parentheses",
        SEMICOLON = "semicolon",
        SQUAREBRACKETS = "squareBrackets";

    // Locale configurations
    var locales = [
        {
            // Infos
            id: "default",
            name: "Default",
            // Substrings
            apostrophe: "’",
            colon: ":",
            dashes: {en: "–", em: "—"},
            ellipsis: "…",
            exclamationMark: "!",
            questionMark: "?",
            quotationMarks: [{opening: "“", closing: "”"}, {opening: "‘", closing: "’"}],
            parentheses: {opening: " (", closing: ") "},
            semicolon: ";",
            squareBrackets: {opening: " [", closing: "] "}
        },
        {
            // Infos
            id: "frFR",
            name: "fr_FR",
            // Substrings
            colon: " :",
            exclamationMark: " !",
            questionMark: " ?",
            quotationMarks: [{opening: "« ", closing: " »"}, {opening: "“", closing: "”"}, {opening: "‘", closing: "’"}],
            semicolon: " ;"
        }
    ];

    /**
     * Get the current locale defined as preference.
     */
    function _getCurrentLocale() {
        var current,
            setting = prefs.get("locale");

        locales.forEach(function (locale) {
            if (locale.id === setting) {
                current = locale;
            }
        });

        return current;
    }

    /**
     * Get the marks from its name. Valid names are one of the constants.
     *
     * @return string When it's a simple group of characters.
     * @return object When it's a set of strings.
     * @return array  When it's a collection of sets.
     */
    function _getMarks(name) {
        var deflt = locales[0],
            current = _getCurrentLocale();

        return current[name] || deflt[name];
    }

    /**
     * Show the preferences dialog.
     */
    function _showDialog() {
        var templateVars = {
                buttons: [{
                    className : Dialogs.DIALOG_BTN_CLASS_NORMAL,
                    id        : Dialogs.DIALOG_BTN_CANCEL,
                    text      : Strings.CANCEL
                }, {
                    className : Dialogs.DIALOG_BTN_CLASS_PRIMARY,
                    id        : Dialogs.DIALOG_BTN_OK,
                    text      : Strings.SAVE
                }],
                locales: locales,
                title: "Locale preferences"
            },
            template = Mustache.render(DialogTemplate, templateVars);

        // Template relative variables
        var currentSetting = prefs.get("locale"),
            locale,
            $select;

        var setLocale = function (event) {
            locale = $select.val();
        };

        // Show dialog
        Dialogs.showModalDialogUsingTemplate(template).done(function (id) {
            if (id === Dialogs.DIALOG_BTN_OK) {
                prefs.set("locale", locale);
                prefs.save();
            }
        });

        // We can define the $select now the dialog is displayed
        $select = $(".otypo-locale-preferences").find("select");
        $select.on("change", setLocale).val(currentSetting);
    }

    prefs.definePreference("locale", "string", "default");
    prefs.save();

    exports.APOSTROPHE      = APOSTROPHE;
    exports.COLON           = COLON;
    exports.DASHES          = DASHES;
    exports.ELLIPSIS        = ELLIPSIS;
    exports.EXCLAMATIONMARK = EXCLAMATIONMARK;
    exports.QUESTIONMARK    = QUESTIONMARK;
    exports.QUOTATIONMARKS  = QUOTATIONMARKS;
    exports.PARENTHESES     = PARENTHESES;
    exports.SEMICOLON       = SEMICOLON;
    exports.SQUAREBRACKETS  = SQUAREBRACKETS;

    exports.showDialog      = _showDialog;
    exports.getMarks        = _getMarks;
});
