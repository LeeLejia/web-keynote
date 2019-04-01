"use strict";
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode_1 = require("vscode");
const markdownEngine_1 = require("./markdownEngine");
class LeetCodeResultProvider {
    initialize(context) {
        this.context = context;
    }
    show(resultString) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.panel) {
                this.panel = vscode_1.window.createWebviewPanel("leetcode.result", "Submission Result", vscode_1.ViewColumn.Two, {
                    retainContextWhenHidden: true,
                    enableFindWidget: true,
                    localResourceRoots: markdownEngine_1.markdownEngine.localResourceRoots,
                });
                this.panel.onDidDispose(() => {
                    this.panel = undefined;
                }, null, this.context.subscriptions);
            }
            const result = this.parseResult(resultString);
            this.panel.webview.html = this.getWebViewContent(result);
            this.panel.reveal(vscode_1.ViewColumn.Two);
        });
    }
    dispose() {
        if (this.panel) {
            this.panel.dispose();
        }
    }
    parseResult(raw) {
        raw = raw.concat("  √ "); // Append a dummy sentinel to the end of raw string
        const regSplit = /  [√×✔✘vx] ([^]+?)\n(?=  [√×✔✘vx] )/g;
        const regKeyVal = /(.+?): ([^]*)/;
        const result = { messages: [] };
        let entry;
        do {
            entry = regSplit.exec(raw);
            if (!entry) {
                continue;
            }
            const kvMatch = regKeyVal.exec(entry[1]);
            if (kvMatch) {
                const key = _.startCase(kvMatch[1]);
                let value = kvMatch[2];
                if (!result[key]) {
                    result[key] = [];
                }
                if (key === "Testcase") {
                    value = value.slice(1, -1).replace("\\n", "\n");
                }
                result[key].push(value);
            }
            else {
                result.messages.push(entry[1]);
            }
        } while (entry);
        return result;
    }
    getWebViewContent(result) {
        const styles = markdownEngine_1.markdownEngine.getStylesHTML();
        const title = `## ${result.messages[0]}`;
        const messages = result.messages.slice(1).map((m) => `* ${m}`);
        const sections = Object.keys(result).filter((k) => k !== "messages").map((key) => [
            `### ${key}`,
            "```",
            result[key].join("\n\n"),
            "```",
        ].join("\n"));
        const body = markdownEngine_1.markdownEngine.render([
            title,
            ...messages,
            ...sections,
        ].join("\n"));
        return `
            <!DOCTYPE html>
            <html>
            <head>
                ${styles}
            </head>
            <body class="vscode-body 'scrollBeyondLastLine' 'wordWrap' 'showEditorSelection'" style="tab-size:4">
                ${body}
            </body>
            </html>
        `;
    }
}
exports.leetCodeResultProvider = new LeetCodeResultProvider();
//# sourceMappingURL=leetCodeResultProvider.js.map