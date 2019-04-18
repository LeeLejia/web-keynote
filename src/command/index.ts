import * as vscode from 'vscode'
import SectionProvider from '../treeView/sectionProvider'
import { PreviewProvider, previewProvider } from '../webview/previewProvider'
import { SyntaxParser } from '../syntaxes-complier/syntax'
import { Doc } from '../model/Doc'
import { Section } from '../model/Section'
import * as os from 'os'
import * as fse from "fs-extra"


export function init(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(WebKeyNote.Command.WEBSLIDE, () => {
    }),
    // 打开文档
    vscode.commands.registerCommand(WebKeyNote.Command.OPEN_DOC, (docName: string, docStr: string) => {
      const sectionProvider: SectionProvider | undefined = context.globalState.get('sectionProvider')
      if (!sectionProvider) {
        vscode.window.showInformationMessage('WebKeyNote尚未激活!')
        return
      }
      if (docStr && docStr.length > 0) {
        const syntaxParser = new SyntaxParser(docStr)
        try{
          const sections = syntaxParser.parse()
          let doc: WebKeyNote.Doc = new Doc(docName, sections)
          sectionProvider.setData(doc.getSections())
          previewProvider.preview(doc)
        }catch(error) {
          console.error(error)
          vscode.window.showInformationMessage('[编译出错] ' +  error.message)
          return
        }
      } else {
        vscode.window.showInformationMessage('空文档鸭～😨')
      }
      // todo create a doc
    }),
    // 打开页面
    vscode.commands.registerCommand(WebKeyNote.Command.OPEN_SECTION, (section?: string | WebKeyNote.Section) => {
      if (!section) {
        return
      }
      const previewProvider: PreviewProvider | undefined = context.globalState.get('previewProvider')
      if(!previewProvider) {
        vscode.window.showInformationMessage('previewProvider尚未初始化!')
        return
      } 
      if(typeof section === 'string') {
        const syntaxParser = new SyntaxParser(section)
        try{
          const sections = syntaxParser.parse()
          if(sections.length === 0) {
            throw new Error('没有文档')
          }
          let section: WebKeyNote.Section = new Section(sections[0])
          previewProvider.preview(section)
        }catch(error) {
          console.error(error)
          vscode.window.showInformationMessage('[编译出错] ' +  error.message)
          return
        }
      } else {
        previewProvider.preview(section)
      }
    }),
    // 预览模版代码
    vscode.commands.registerCommand(WebKeyNote.Command.VIEW_CODE, async doc=>{
      await fse.ensureDir(os.tmpdir())
      const filePath = `${os.tmpdir()}/模版.klang`
      fse.writeFile(filePath, doc.content)
      vscode.commands.executeCommand(WebKeyNote.Command.OPEN_DOC, doc.title + ' [模版]', doc.content)
      await vscode.window.showTextDocument(vscode.Uri.file(filePath), { viewColumn: vscode.ViewColumn.One,preview: false })
    }),
    // 编辑文档
    vscode.commands.registerCommand(WebKeyNote.Command.OPEN_DOC_EDITOR, callback=>{
      // todo
    })
  )
}