/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Extension that fix punctuation in the current document. */
define(function (require, exports, module) {
    "use strict";

    // Fixers
    var Apostrophe     = require('fixers/Apostrophe'),
        Dashes         = require('fixers/Dashes'),
        QuotationMarks = require('fixers/QuotationMarks');

    // Brackets modules
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    // Constants
    var COMMAND_ID            = "neol.otypo.editmenu.fix",
        CONTEXTUAL_COMMAND_ID = "neol.otypo.contextualmenu.fix";

    /**
     * Fix typographical syntax on a string.
     * @param {string} rawText The string to fix.
     * @returns {string} The string fixed.
     */
    function _fixString(rawText) {
        if (typeof rawText === "string") {
            rawText = QuotationMarks.fix(rawText);
            rawText = Apostrophe.fix(rawText);
            rawText = Colon.fix(rawText);
            rawText = Dashes.fix(rawText);
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

    /**
     * Menus
     */

    // Key bindings
    var keyBindings = [{
            key: "Shift-F2",
            platform: "win"
        }, {
            key: "Shift-F2",
            platform: "mac"
        }];

    // Locale submenu


    // Edit menu
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);

    CommandManager.register("Fix punctuation", COMMAND_ID, _commandClick);

    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID, keyBindings);

    // Contextual menu
    var contextualMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);

    CommandManager.register("Fix typography", CONTEXTUAL_COMMAND_ID, _commandClick);

    contextualMenu.addMenuItem(CONTEXTUAL_COMMAND_ID);
});
