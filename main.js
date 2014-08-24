/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Extension that fix punctuation in the current document. */
define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    // Constants
    var COMMAND_ID = "neol.punctuation.fix",
        COMMAND_SAVE_ID = "neol.punctuation.fixonsave";
    
    /**
     * Fix the current document.
     */
    function _fixDocument(doc) {
        console.log(doc.getText());
    }
    
    /**
     * Handle click on "Fix punctuation" menu item.
     */
    function _fixCommandClick() {
        var editor = EditorManager.getFocusedEditor();
        
        if (editor) {
            _fixDocument(editor.document);
        }
    }
    
    /**
     * Handle click on "Fix punctuation on save" menu item.
     */
    function _fixOnSaveCommandClick() {
        // Add or remove a listener on document 'just before save' event ?
    }


    // Edit menu
    CommandManager.register("Fix punctuation", COMMAND_ID, _fixCommandClick);
    CommandManager.register("Fix punctuation on save", COMMAND_SAVE_ID, _fixOnSaveCommandClick);

    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID);
    menu.addMenuItem(COMMAND_SAVE_ID);
});

