"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const treeView = require("./treeView");
const commands = require("./command");
const webview = require("./webview");
const Doc_1 = require("./model/Doc");
function activate(context) {
    treeView.init(context);
    commands.init(context);
    webview.init(context);
    const fileDocsProvider = context.globalState.get('fileDocsProvider');
    // init data
    const doc1 = new Doc_1.Doc('前端简介1', 'xxx', 'none thing');
    const doc2 = new Doc_1.Doc('前端简介2', 'xxx', 'none thing');
    const doc3 = new Doc_1.Doc('前端简介3', 'xxx', 'none thing');
    fileDocsProvider && fileDocsProvider.setData([
        doc1, doc2, doc3
    ]);
}
exports.activate = activate;
function deactivate() {
    vscode.window.showInformationMessage('啊，为什么禁用我!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map