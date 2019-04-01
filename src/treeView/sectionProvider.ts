import * as vscode from 'vscode'
import * as path from 'path'


export default class SectionProvider implements vscode.TreeDataProvider<WebKeyNote.Section> {

  private onDidChangeTreeDataEvent: vscode.EventEmitter<any> = new vscode.EventEmitter<any>()
  public readonly onDidChangeTreeData: vscode.Event<any> = this.onDidChangeTreeDataEvent.event
  private treeData: WebKeyNote.Section[] = []

  constructor(private context: vscode.ExtensionContext) {}

  // 更新值
  public setData(treeData: WebKeyNote.Section[]) {
    this.treeData = treeData
    this.onDidChangeTreeDataEvent.fire()
  }

  getTreeItem(element: WebKeyNote.Section): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const item = new vscode.TreeItem(`${element.title}`, vscode.TreeItemCollapsibleState.None)
    item.description = `${element.index + 1}/${this.treeData.length}`
    if(element.describe) {
      item.tooltip = element.describe
    }
    item.iconPath = this.context.asAbsolutePath(path.join('resources', 'section.svg'))
    item.command = {
      title: 'open section',
      command: WebKeyNote.Command.OPEN_SECTION,
      arguments: [element]
    }
    return item
  }

  getChildren(element?: WebKeyNote.Section | undefined): vscode.ProviderResult<WebKeyNote.Section[]> {
    return this.treeData
  }

}