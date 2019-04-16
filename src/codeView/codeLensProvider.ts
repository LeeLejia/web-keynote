// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";

class CodeLensProvider implements vscode.CodeLensProvider {

    public provideCodeLenses(document: vscode.TextDocument): vscode.ProviderResult<vscode.CodeLens[]> {
        const range: vscode.Range = new vscode.Range(document.lineCount - 1, 0, document.lineCount - 1, 0)
        const pattern = /\/([^\/]+)\.klang$/.exec(document.fileName)
        const title = (pattern && pattern.length >= 2)?pattern[1] + ' [Doc]': 'KeyNote Doc'
        const lens: vscode.CodeLens = new vscode.CodeLens(range, {
            title: "🚗预览",
            command: WebKeyNote.Command.OPEN_DOC,
            arguments: [title, document.getText()]
        });

        return [lens];
    }
}

export const codeLensProvider: CodeLensProvider = new CodeLensProvider();
