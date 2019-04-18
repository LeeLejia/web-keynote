import NodeParse from './NodeParse'
import * as vscode from 'vscode'
export class Section implements WebKeyNote.Section {
  index: number = 0
  title: string = 'WebKeyNote Page'
  describe?: string = ''
  text: string = ''

  constructor(sectionNode: WebKeyNote.Node, index?: number) {
    this.index = index || 0
    this.text = this.parseSection(sectionNode)
  }
  // 解析节点
  private parseNode(node: WebKeyNote.Node): string {
    const parse = NodeParse[node.name]
    if(!parse) {
      console.warn(`不存在名称为${node.name}的节点类型`)
      vscode.window.showInformationMessage(`不存在名称为${node.name}的节点类型`)
      return ''
    }
    return parse(node) || ''
  }

  // attributeList: title,describe,background,innerHtml,innerText
  private parseSection(section: WebKeyNote.Node): string {
    let background: string = ''
    let innerHtml: string = ''
    let innerStyle: string = ''
    section.attributes.forEach(attr => {
      if(attr.key === 'title') {
        this.title = String(attr.val)
      } else if(attr.key === 'describe') {
        this.describe = String(attr.val)
      } else if(attr.key === 'background') {
        background = `<span class="background" style="background-image:url('${attr.val}')"></span>`
      } else if(attr.key === 'innerHtml') {
        innerHtml = String(attr.val)
      } else if (attr.key === 'innerStyle') {
        innerStyle = String(attr.val)
      }
    })
    const content = `
      <section class='${section.classList.join(' ')}'>
        ${background}
        <div class="wrap">
          ${section.childNodes.map(this.parseNode).join('\n')}
          ${innerStyle}
          ${innerHtml}
        </div>
      </section>
    `
    return content
  }

  renderHTML(): string {
    return this.text
  }
}