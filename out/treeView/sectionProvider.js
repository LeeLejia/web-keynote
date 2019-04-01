"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
class SectionProvider {
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
        item.description = `${element.index + 1}/${this.treeData.length}`;
        if (element.describe) {
            item.tooltip = element.describe;
        }
        item.iconPath = this.context.asAbsolutePath(path.join('resources', 'section.svg'));
        item.command = {
            title: 'open section',
            command: "extension.open_section" /* OPEN_SECTION */,
            arguments: [element]
        };
        return item;
    }
    getChildren(element) {
        return this.treeData;
    }
}
exports.default = SectionProvider;
//# sourceMappingURL=sectionProvider.js.map