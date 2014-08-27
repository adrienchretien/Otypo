/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Extension that fix punctuation in the current document. */
define(function (require, exports, module) {
    "use strict";

    // Fixers
    var Apostrophe      = require('fixers/Apostrophe'),
        QuotationMarks  = require('fixers/QuotationMarks');

    // Brackets modules
    var CommandManager  = brackets.getModule("command/CommandManager"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        Menus           = brackets.getModule("command/Menus");

    // Constants
    var COMMAND_ID      = "neol.punctuation.fix";

    /**
     * Fix typographical syntax on a string.
     * @param {string} rawText - The string to fix.
     * @returns {string} The string fixed.
     */
    function _fixString(rawText) {
        if (typeof rawText === "string") {
            rawText = QuotationMarks.fix(rawText);
            rawText = Apostrophe.fix(rawText);
        }

        return rawText;
    }

    /**
     * Handle click on the "Fix punctuation" menu item.
     */
    function _commandClick() {
        var editor = EditorManager.getFocusedEditor();

        if (editor && editor.hasSelection()) {
            var text = editor.getSelectedText(),
                selection = editor.getSelection();

            text = _fixString(text);

            editor.document.replaceRange(text, selection.start, selection.end);
        }
    }

    // Edit menu
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU),
        windowsKeyBinding = {
            key: "Shift-F2",
            platform: "win"
        },
        macKeyBinding = {
            key: "Shift-F2",
            platform: "mac"
        },
        keyBindings = [windowsKeyBinding, macKeyBinding];

    CommandManager.register("Fix punctuation", COMMAND_ID, _commandClick);

    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID, keyBindings);
});
