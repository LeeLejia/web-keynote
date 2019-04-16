import { Section } from "./Section";

export class Doc implements WebKeyNote.Doc {
  
  title: string
  sectionList: Section[]

  constructor(docName: string, nodeList: WebKeyNote.Node[]) {
    if (nodeList.length < 0) {
      throw new Error('empty document!')
    }
    this.sectionList = nodeList.filter(node => node.name === 'section').map((node, index) => {
      return new Section(node, index)
    })
    if (this.sectionList.length === 0) {
      throw new Error('no section!')
    }
    this.title = docName || 'KeyNote Doc'
  }

  getSections(): Section[] {
    return this.sectionList
  }

  renderHTML(): string {
    return this.sectionList.map(section => section.renderHTML()).join('\n')
  }
}