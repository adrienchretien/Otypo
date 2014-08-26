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
     * Apply fixers on a raw text.
     */
    function _applyFixers(content) {
        if (typeof content === "string") {
            content = QuotationMarks.fix(content);
            content = Apostrophe.fix(content);
        }

        return content;
    }

    /**
     * Handle click on "Fix punctuation" menu item.
     */
    function _fixCommandClick() {
        var editor = EditorManager.getFocusedEditor();

        if (editor && editor.hasSelection()) {
            var text = editor.getSelectedText(),
                selection = editor.getSelection();

            text = _applyFixers(text);

            editor.document.replaceRange(text, selection.start, selection.end);
        }
    }

    // Edit menu
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU),
        windowsShortcut = {
            key: "Shift-O",
            platform: "win"
        },
        macShortcut = {
            key: "Shift-O",
            platform: "mac"
        },
        shortcuts = [windowsShortcut, macShortcut];

    CommandManager.register("Fix punctuation", COMMAND_ID, _fixCommandClick);

    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID, shortcuts);
});

