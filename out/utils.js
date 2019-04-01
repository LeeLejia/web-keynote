"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function showFileSelectDialog() {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultUri = vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined;
        const options = {
            defaultUri,
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            openLabel: "Select",
        };
        return yield vscode.window.showOpenDialog(options);
    });
}
exports.showFileSelectDialog = showFileSelectDialog;
function openUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
    });
}
exports.openUrl = openUrl;
function isWindows() {
    return process.platform === "win32";
}
exports.isWindows = isWindows;
//# sourceMappingURL=utils.js.map