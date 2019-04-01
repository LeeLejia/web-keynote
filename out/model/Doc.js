"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Doc {
    constructor(title, text, describe, createdAt, LastModifyAt) {
        this.title = title;
        this.text = text;
        this.describe = describe;
        this.createdAt = createdAt;
        this.LastModifyAt = LastModifyAt;
    }
    getSections() {
        return [{ title: '前端学习' + Date.now(), index: 0, text: '', describe: `` },
            { title: '补血来了', index: 1, text: `` },
            { title: '哈哈', index: 2, text: '' },
            { title: '去你妈的', index: 3, text: '' },
            { title: '狗屁', index: 4, text: '' }];
    }
}
exports.Doc = Doc;
//# sourceMappingURL=Doc.js.map