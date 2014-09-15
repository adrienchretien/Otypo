/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var Dialogs            = brackets.getModule("widgets/Dialogs"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        Strings            = brackets.getModule("strings"),
        prefs              = PreferencesManager.getExtensionPrefs("neol.otypo.preferences");

    // Extension modules
    var LocaleManager = require("./LocaleManager");

    // HTML templates
    var DialogTemplate = require("text!htmlContent/locale-preferences-dialog.html");

    // Constants
    var DEFAULT_LOCALE_ID = LocaleManager.DEFAULT_LOCALE_ID;


    /**
     * Define preferences of the extension.
     */
    function definePreferences() {
        prefs.definePreference("html", "boolean", false);
        prefs.definePreference("locale", "string", DEFAULT_LOCALE_ID);
        prefs.save();
    }

    /**
     * Get the preference manager.
     * @return {PreferenceManager} The PreferenceManager instance of the locales.
     */
    function getManager() {
        return prefs;
    }

    /**
     * Show the preferences dialog.
     */
    function showDialogCommand() {
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
                locales: LocaleManager.getLocalesId,
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

    definePreferences();

    exports.getManager = getManager;
    exports.showDialogCommand = showDialogCommand;
});
