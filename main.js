/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Extension that fix punctuation in the current document. */
define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    // Otypo modules
    var Locale = require('./Locale');

    // Fixers
    var Apostrophe      = require('fixers/Apostrophe'),
        Colon           = require('fixers/Colon'),
        Dashes          = require('fixers/Dashes'),
        Ellipsis        = require('fixers/Ellipsis'),
        ExclamationMark = require('fixers/ExclamationMark'),
        QuestionMark    = require('fixers/QuestionMark'),
        QuotationMarks  = require('fixers/QuotationMarks'),
        SemiColon       = require('fixers/SemiColon');

    // Constants
    var COMMAND_ID             = "neol.otypo.editmenu.fix",
        CONTEXTUAL_COMMAND_ID  = "neol.otypo.contextualmenu.fix",
        LOCALE_PREF_COMMAND_ID = "neol.otypo.locale.prefsmenu";

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

    /**
     * Handle click on the “Fix punctuation” menu item.
     */
    function _commandClick() {
        var editor = EditorManager.getFocusedEditor();

        if (editor && editor.hasSelection()) {

            var selections = editor.getSelections();

            selections.forEach(function (sel) {
                var text = editor.document.getRange(sel.start, sel.end);

                text = _fixString(text);

                editor.document.replaceRange(text, sel.start, sel.end);
            });
        }
    }

    // Key bindings
    var keyBindings = [{
            key: "Shift-F2",
            platform: "win"
        }, {
            key: "Shift-F2",
            platform: "mac"
        }];

    // Edit menu
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);

    CommandManager.register("Otypo fix", COMMAND_ID, _commandClick);
    CommandManager.register("Otypo locale preferences", LOCALE_PREF_COMMAND_ID, Locale.showDialog);

    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID, keyBindings);
    menu.addMenuItem(LOCALE_PREF_COMMAND_ID);

    // Contextual menu
    var contextualMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);

    CommandManager.register("Fix typography", CONTEXTUAL_COMMAND_ID, _commandClick);

    contextualMenu.addMenuItem(CONTEXTUAL_COMMAND_ID);
});
