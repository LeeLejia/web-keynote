import * as vscode from 'vscode'
import * as treeView from './treeView'
import * as commands from './command'
import * as webview from './webview'
import { Doc } from './model/Doc'
import DocProvider from './treeView/docProvider'

export function activate(context: vscode.ExtensionContext) {
	treeView.init(context)
  commands.init(context)
  webview.init(context)  
  
	const fileDocsProvider: DocProvider | undefined = context.globalState.get('fileDocsProvider')
  // init data
  const doc1 = new Doc('前端简介1', 'xxx', 'none thing')
  const doc2 = new Doc('前端简介2', 'xxx', 'none thing')
  const doc3 = new Doc('前端简介3', 'xxx', 'none thing')
  fileDocsProvider && fileDocsProvider.setData([
    doc1, doc2, doc3
  ])
}

export function deactivate() {
	vscode.window.showInformationMessage('啊，为什么禁用我!')
}