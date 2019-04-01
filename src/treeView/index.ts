import * as vscode from 'vscode'
import DocProvider from './docProvider'
import SectionProvider from './sectionProvider'

export function init(context: vscode.ExtensionContext) {
  const templateDocsProvider: DocProvider = new DocProvider(context)
  const fileDocsProvider: DocProvider = new DocProvider(context)
  const sectionProvider: SectionProvider = new SectionProvider(context)
  context.globalState.update('sectionProvider', sectionProvider)
  context.globalState.update('templateDocsProvider', templateDocsProvider)
  context.globalState.update('fileDocsProvider', fileDocsProvider)
  context.subscriptions.push(
    vscode.window.createTreeView("WebKeyNote_current_doc", { treeDataProvider: sectionProvider, showCollapseAll: true }),
    vscode.window.createTreeView("WebKeyNote_doc_template", { treeDataProvider: templateDocsProvider, showCollapseAll: false }),
    vscode.window.createTreeView("WebKeyNote_doc_dir", { treeDataProvider: fileDocsProvider, showCollapseAll: false })
  )
}