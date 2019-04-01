"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const docProvider_1 = require("./docProvider");
const sectionProvider_1 = require("./sectionProvider");
function init(context) {
    const templateDocsProvider = new docProvider_1.default(context);
    const fileDocsProvider = new docProvider_1.default(context);
    const sectionProvider = new sectionProvider_1.default(context);
    context.globalState.update('sectionProvider', sectionProvider);
    context.globalState.update('templateDocsProvider', templateDocsProvider);
    context.globalState.update('fileDocsProvider', fileDocsProvider);
    context.subscriptions.push(vscode.window.createTreeView("WebKeyNote_current_doc", { treeDataProvider: sectionProvider, showCollapseAll: true }), vscode.window.createTreeView("WebKeyNote_doc_template", { treeDataProvider: templateDocsProvider, showCollapseAll: false }), vscode.window.createTreeView("WebKeyNote_doc_dir", { treeDataProvider: fileDocsProvider, showCollapseAll: false }));
}
exports.init = init;
//# sourceMappingURL=index.js.map