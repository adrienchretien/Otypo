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
            parentheses: {start: " (", end: ") "},
            semicolon: ";",
            squareBrackets: {start: " [", end: "] "}
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
     * Handle click on the “Locale preferences” menu item.
     */
    function _commandClick() {
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

    function _getSubstring(name) {
        var base = locales[0],
            current,
            setting = prefs.get("locale");

        locales.forEach(function (locale) {
            if (locale.id === setting) {
                current = locale;
            }
        });

        return current[name] || base[name];
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

    exports.commandClick    = _commandClick;
    exports.getSubstring    = _getSubstring;
});
