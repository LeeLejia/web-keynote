import * as vscode from 'vscode'
import * as path from 'path'

export default class DocProvider implements vscode.TreeDataProvider<{title: string, content: string}> {

  private onDidChangeTreeDataEvent: vscode.EventEmitter<any> = new vscode.EventEmitter<any>()
  public readonly onDidChangeTreeData: vscode.Event<any> = this.onDidChangeTreeDataEvent.event
  private treeData: {title: string, content: string}[] = []

  constructor(private context: vscode.ExtensionContext) { }

  // 更新值
  public setData(treeData: {title: string, content: string}[]) {
    this.treeData = treeData
    this.onDidChangeTreeDataEvent.fire()
  }

  // todo open file can edit
  getTreeItem(element: {title: string, content: string}): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const item = new vscode.TreeItem(`${element.title}`, vscode.TreeItemCollapsibleState.None)
    item.iconPath = this.context.asAbsolutePath(path.join('resources', 'doc.svg'))
    item.command = {
      title: 'Open WebKeyNote',
      command: WebKeyNote.Command.VIEW_CODE,
      arguments: [element]
    }
    return item
  }

  getChildren(element?: {title: string, content: string} | undefined): vscode.ProviderResult<{title: string, content: string}[]> {
    return this.treeData
  }

}