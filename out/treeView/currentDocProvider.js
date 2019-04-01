"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class CurrentDocProvider {
    getTreeItem(element) {
        return new vscode.TreeItem(`${element.title}  [第${element.index}页]`, vscode.TreeItemCollapsibleState.None);
    }
    getChildren(element) {
        return [
            { title: '前端学习', index: 0, text: '' },
            { title: '补血来了', index: 1, text: '' },
            { title: '哈哈', index: 2, text: '' },
            { title: '去你妈的', index: 3, text: '' },
            { title: '狗屁', index: 4, text: '' }
        ];
    }
}
exports.default = CurrentDocProvider;
//# sourceMappingURL=currentDocProvider.js.map