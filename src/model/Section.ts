export class Section implements WebKeyNote.Section {
  index: number
  title: string
  text: string
  describe?: string | undefined
  constructor(index: number, title: string, text: string, describe?: string) {
    this.index = index
    this.title = title
    this.text = text
    this.describe = describe
  }
}