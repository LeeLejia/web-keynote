import * as vscode from 'vscode'
import * as path from 'path'

export default class DocProvider implements vscode.TreeDataProvider<WebKeyNote.Doc> {

  private onDidChangeTreeDataEvent: vscode.EventEmitter<any> = new vscode.EventEmitter<any>()
  public readonly onDidChangeTreeData: vscode.Event<any> = this.onDidChangeTreeDataEvent.event
  private treeData: WebKeyNote.Doc[] = []

  constructor(private context: vscode.ExtensionContext) { }

  // 更新值
  public setData(treeData: WebKeyNote.Doc[]) {
    this.treeData = treeData
    this.onDidChangeTreeDataEvent.fire()
  }

  getTreeItem(element: WebKeyNote.Doc): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const item = new vscode.TreeItem(`${element.title}`, vscode.TreeItemCollapsibleState.None)
    item.iconPath = this.context.asAbsolutePath(path.join('resources', 'doc.svg'))
    item.command = {
      title: 'Open WebKeyNote',
      command: WebKeyNote.Command.OPEN_DOC,
      arguments: [element]
    }
    return item
  }

  getChildren(element?: WebKeyNote.Doc | undefined): vscode.ProviderResult<WebKeyNote.Doc[]> {
    return this.treeData
  }

}