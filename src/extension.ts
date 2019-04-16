import * as vscode from 'vscode'
import * as treeView from './treeView'
import * as commands from './command'
import * as webview from './webview'
import * as codeView from './codeView'
import { Doc } from './model/Doc'
import DocProvider from './treeView/docProvider'

export function activate(context: vscode.ExtensionContext) {
  commands.init(context)
  treeView.init(context)
  webview.init(context)
  codeView.init(context)

  // todo
  // const fileDocsProvider: DocProvider | undefined = context.globalState.get('fileDocsProvider')
  // fileDocsProvider && fileDocsProvider.setData([
  //   doc1, doc2, doc3
  // ])
}

export function deactivate() {
  vscode.window.showInformationMessage('啊，为什么禁用我!')
}