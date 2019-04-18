import * as vscode from 'vscode'
import DocProvider from './docProvider'
import SectionProvider from './sectionProvider'
import * as exampleList from './doc-simple.json'

export function init(context: vscode.ExtensionContext) {
  const templateDocsProvider: DocProvider = new DocProvider(context)
  const sectionProvider: SectionProvider = new SectionProvider(context)
  context.globalState.update('sectionProvider', sectionProvider)
  context.globalState.update('templateDocsProvider', templateDocsProvider)
  context.subscriptions.push(
    vscode.window.createTreeView("WebKeyNote_current_doc", { treeDataProvider: sectionProvider, showCollapseAll: true }),
    vscode.window.createTreeView("WebKeyNote_doc_template", { treeDataProvider: templateDocsProvider, showCollapseAll: true }),
  )
  templateDocsProvider.setData(exampleList)
}