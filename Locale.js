/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

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
    var DEFAULT_LOCALE_ID = "en_US",
        APOSTROPHE = "apostrophe",
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
            id: "en_GB",
            // Substrings
            quotationMarks: [{opening: "‘", closing: "’"}, {opening: "“", closing: "”"}]
        },
        {
            // Infos
            id: "en_US",
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
            id: "fr_FR",
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
     * @return {object} The corresponding locale.
     * @return {null} If the id corresponding to any locales.
     */
    function _getLocaleById(id) {
        var locale = null;

        locales.forEach(function (item) {
            if (item.id === id) {
                locale = item;
            }
        });

        return locale;
    }

    /**
     * Get the current locale defined as preference.
     * @return {object} The current locale.
     */
    function _getCurrentLocale() {
        var currentId = prefs.get("locale");
        return _getLocaleById(currentId);
    }

    /**
     * Get the marks from its name. Valid names are one of the constants.
     *
     * @return {string} When it's a simple group of characters.
     * @return {object} When it's a set of strings.
     * @return {array}  When it's a collection of sets.
     */
    function _getMarks(name) {
        var deflt = _getLocaleById(DEFAULT_LOCALE_ID),
            current = _getCurrentLocale();

        return current[name] || deflt[name];
    }

    /**
     * Report the html locale auto recognition state.
     */
    function _htmlLocaleAuto() {
        return prefs.get("html");
    }

    /**
     * Show the preferences dialog.
     */
    function _showDialog() {
        var $checkbox,
            $select,
            html,
            locale,
            settings = {
                html: prefs.get("html"),
                locale: prefs.get("locale")
            },
            templateVars = {
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
                title: "Otypo locale preferences"
            },
            template = Mustache.render(DialogTemplate, templateVars);

        // Handle locale selection change.
        function setLocale(event) {
            locale = $select.val();
        }

        // Handle html locale auto recognition checkbox change.
        function setHtml(event) {
            html = $checkbox.is(":checked");
        }

        // Show dialog
        Dialogs.showModalDialogUsingTemplate(template).done(function (id) {
            if (id === Dialogs.DIALOG_BTN_OK) {
                prefs.set("html", html);
                prefs.set("locale", locale);
                prefs.save();
            }
        });

        // We can define the $select now the dialog is displayed
        $select = $(".otypo-locale-preferences").find("select");
        $select.on("change", setLocale).val(settings.locale);

        // Then the checkbox
        $checkbox = $(".otypo-locale-preferences").find('[type="checkbox"]');
        $checkbox.on("change", setHtml).val(settings.html);
    }

    prefs.definePreference("html", "boolean", false);
    prefs.definePreference("locale", "string", DEFAULT_LOCALE_ID);
    prefs.save();

    exports.APOSTROPHE      = APOSTROPHE;
    exports.COLON           = COLON;
    exports.DASHES          = DASHES;
    exports.ELLIPSIS        = ELLIPSIS;
    exports.EXCLAMATIONMARK = EXCLAMATIONMARK;
    exports.QUESTIONMARK    = QUESTIONMARK;
    exports.QUOTATIONMARKS  = QUOTATIONMARKS;
    exports.SEMICOLON       = SEMICOLON;

    exports.getMarks        = _getMarks;
    exports.htmlLocaleAuto  = _htmlLocaleAuto;
    exports.showDialog      = _showDialog;
});
