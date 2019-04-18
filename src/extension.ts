import * as vscode from 'vscode'
import * as treeView from './treeView'
import * as commands from './command'
import * as webview from './webview'
import * as codeView from './codeView'

export function activate(context: vscode.ExtensionContext) {
  commands.init(context)
  treeView.init(context)
  webview.init(context)
  codeView.init(context)
}

export function deactivate() {
  vscode.window.showInformationMessage('啊，为什么禁用我!')
}