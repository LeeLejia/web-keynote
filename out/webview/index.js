"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sectionPreviewProvider_1 = require("./sectionPreviewProvider");
function init(context) {
    sectionPreviewProvider_1.sectionPreviewProvider.initialize(context);
    context.globalState.update('sectionPreviewProvider', sectionPreviewProvider_1.sectionPreviewProvider);
    context.subscriptions.push(sectionPreviewProvider_1.sectionPreviewProvider);
}
exports.init = init;
//# sourceMappingURL=index.js.map