"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
// async function showProblemInternal(node: IProblem): Promise<void> {
//   try {
//       const language: string | undefined = await fetchProblemLanguage();
//       if (!language) {
//           return;
//       }
//       // SUGGESTION: group config retriving into one file
//       const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode");
//       let outDir: string = await selectWorkspaceFolder();
//       let relativePath: string = (leetCodeConfig.get<string>("outputFolder") || "").trim();
//       const matchResult: RegExpMatchArray | null = relativePath.match(/\$\{(.*?)\}/);
//       if (matchResult) {
//           const resolvedPath: string | undefined = await resolveRelativePath(matchResult[1].toLocaleLowerCase(), node, language);
//           if (!resolvedPath) {
//               leetCodeChannel.appendLine("Showing problem canceled by user.");
//               return;
//           }
//           relativePath = resolvedPath;
//       }
//       outDir = path.join(outDir, relativePath);
//       await fse.ensureDir(outDir);
//       const originFilePath: string = await leetCodeExecutor.showProblem(node, language, outDir);
//       const filePath: string = wsl.useWsl() ? await wsl.toWinPath(originFilePath) : originFilePath;
//       await vscode.window.showTextDocument(vscode.Uri.file(filePath), { preview: false });
//   } catch (error) {
//       await promptForOpenOutputChannel("Failed to show the problem. Please open the output channel for details.", DialogType.error);
//   }
// }
function init(context) {
    context.subscriptions.push(vscode.commands.registerCommand("extension.WebKeyNote" /* WEBSLIDE */, () => {
        vscode.window.showInformationMessage('狗子!');
    }), 
    // 打开文档
    vscode.commands.registerCommand("extension.open_doc" /* OPEN_DOC */, (doc) => {
        const sectionProvider = context.globalState.get('sectionProvider');
        if (!sectionProvider) {
            vscode.window.showInformationMessage('WebKeyNote尚未激活!');
            return;
        }
        if (doc) {
            sectionProvider.setData(doc.getSections());
        }
        // todo create a doc
    }), 
    // 打开页面
    vscode.commands.registerCommand("extension.open_section" /* OPEN_SECTION */, (section) => {
        if (!section) {
            return;
        }
        const sectionPreviewProvider = context.globalState.get('sectionPreviewProvider');
        if (!sectionPreviewProvider) {
            vscode.window.showInformationMessage('sectionPreviewProvider尚未初始化!');
            return;
        }
        sectionPreviewProvider.preview(section);
    }), 
    // 编辑文档
    vscode.commands.registerCommand("extension.open_doc_editor" /* OPEN_DOC_EDITOR */, callback => {
        // todo
    }));
}
exports.init = init;
//# sourceMappingURL=index.js.map