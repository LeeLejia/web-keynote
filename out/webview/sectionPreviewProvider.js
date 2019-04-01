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
const vscode_1 = require("vscode");
const path = require("path");
class SectionPreviewProvider {
    initialize(context) {
        this.context = context;
    }
    preview(section) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.context) {
                vscode_1.window.showInformationMessage('SectionPreviewProvider尚未注册!');
                return;
            }
            this.section = section;
            if (!this.panel) {
                this.panel = vscode_1.window.createWebviewPanel("WebKeyNote.section.preview", "Section preview", vscode_1.ViewColumn.Active, {
                    enableScripts: true,
                    enableCommandUris: true,
                    enableFindWidget: true,
                    retainContextWhenHidden: true,
                });
                // 和webview交互
                // todo 交互细节
                this.panel.webview.onDidReceiveMessage((message) => __awaiter(this, void 0, void 0, function* () {
                    switch (message.command) {
                        case "xxx":
                            yield vscode_1.commands.executeCommand("xxx", this.section);
                            this.dispose();
                            return;
                    }
                }), this, this.context.subscriptions);
                this.panel.onDidDispose(() => {
                    this.panel = undefined;
                }, null, this.context.subscriptions);
            }
            this.panel.webview.html = yield this.provideHtmlContent(section);
            this.panel.title = `${section.title}`;
            this.panel.iconPath = vscode_1.Uri.file(this.context.asAbsolutePath(path.join('resources', 'section.svg')));
            this.panel.reveal();
        });
    }
    dispose() {
        if (this.panel) {
            this.panel.dispose();
        }
    }
    provideHtmlContent(section) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.renderHTML(section);
        });
    }
    renderHTML(section) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlTemplate = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview Problem</title>
            </head>
            <style>
                #solve {
                    position: fixed
                    bottom: 1rem
                    right: 1rem
                    border: 0
                    margin: 1rem 0
                    padding: 0.2rem 1rem
                    color: white
                    background-color: var(--vscode-button-background)
                }
                #solve:hover {
                    background-color: var(--vscode-button-hoverBackground)
                }
                #solve:active {
                    border: 0
                }
            </style>
            <body>
                <div >
                    ${section.text}
                </div>
                <button id="solve">Code Now</button>
                <script>
                    (function() {
                        const vscode = acquireVsCodeApi()
                        let button = document.getElementById('solve')
                        button.onclick = solveHandler
                        function solveHandler() {
                            vscode.postMessage({
                                command: 'xxxx',
                            })
                        }
                    }())
                </script>
            </body>
        </html>
        `;
            return htmlTemplate;
        });
    }
}
exports.SectionPreviewProvider = SectionPreviewProvider;
exports.sectionPreviewProvider = new SectionPreviewProvider();
//# sourceMappingURL=sectionPreviewProvider.js.map