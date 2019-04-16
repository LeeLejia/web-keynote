import * as vscode from 'vscode'
import * as path from 'path'

export async function showFileSelectDialog(): Promise<vscode.Uri[] | undefined> {
  const defaultUri: vscode.Uri | undefined = vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined;
  const options: vscode.OpenDialogOptions = {
      defaultUri,
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      openLabel: "Select",
  };
  return await vscode.window.showOpenDialog(options);
}

export async function openUrl(url: string): Promise<void> {
  vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
}

export function isWindows(): boolean {
  return process.platform === "win32";
}

// 使用vscode-resource协议在webview中引用本地资源
export function getExtensionFileVscodeResource(context: vscode.ExtensionContext, relativePath: string) {
	const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath))
	return diskPath.with({ scheme: 'vscode-resource' }).toString()
}