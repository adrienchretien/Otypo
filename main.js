/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Extension that fix punctuation in the current document. */
define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var CommandManager  = brackets.getModule("command/CommandManager"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        FileUtils       = brackets.getModule("file/FileUtils"),
        Menus           = brackets.getModule("command/Menus");

    // Otypo modules
    var Fixer  = require('./Fixer'),
        Locale = require('./Locale');

    // Constants
    var COMMAND_ID             = "neol.otypo.editmenu.fix",
        CONTEXTUAL_COMMAND_ID  = "neol.otypo.contextualmenu.fix",
        LOCALE_PREF_COMMAND_ID = "neol.otypo.locale.prefsmenu";

    /**
     * Fix selections as raw text.
     * @param {editor} An editor object.
     */
    function _fixSelections(editor) {
        var selections = editor.getSelections();

        selections.forEach(function (sel) {
            var text = editor.document.getRange(sel.start, sel.end);

            text = Fixer.fixString(text);

            editor.document.replaceRange(text, sel.start, sel.end);
        });
    }

    /**
     * Fix the current document.
     */
    function _fixDocument(doc) {
        var text = doc.getText();

        text = Fixer.fixString(text);

        doc.setText(text);
    }

    /**
     * Handle click on the “Fix punctuation” menu item.
     */
    function _commandClick() {
        var editor = EditorManager.getFocusedEditor();

        if (editor) {
            if (editor.hasSelection()) {
                _fixSelections(editor);
            } else {
                _fixDocument(editor.document);
            }
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

    CommandManager.register("Otypo fix", CONTEXTUAL_COMMAND_ID, _commandClick);

    contextualMenu.addMenuItem(CONTEXTUAL_COMMAND_ID);
});
