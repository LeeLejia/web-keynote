"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
class DocProvider {
    constructor(context) {
        this.context = context;
        this.onDidChangeTreeDataEvent = new vscode.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataEvent.event;
        this.treeData = [];
    }
    // 更新值
    setData(treeData) {
        this.treeData = treeData;
        this.onDidChangeTreeDataEvent.fire();
    }
    getTreeItem(element) {
        const item = new vscode.TreeItem(`${element.title}`, vscode.TreeItemCollapsibleState.None);
        if (element.describe) {
            item.description = element.describe;
            item.tooltip = element.describe;
        }
        item.iconPath = this.context.asAbsolutePath(path.join('resources', 'doc.svg'));
        item.command = {
            title: 'Open WebKeyNote',
            command: "extension.open_doc" /* OPEN_DOC */,
            arguments: [element]
        };
        return item;
    }
    getChildren(element) {
        return this.treeData;
    }
}
exports.default = DocProvider;
//# sourceMappingURL=docProvider.js.map