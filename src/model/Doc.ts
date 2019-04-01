export class Doc implements WebKeyNote.Doc {
  title: string
  text: string
  describe?: string | undefined
  createdAt?: number | undefined
  LastModifyAt?: number | undefined
  constructor(title: string, text: string, describe?: string, createdAt?: number, LastModifyAt?: number) {
    this.title = title
    this.text = text
    this.describe = describe
    this.createdAt = createdAt
    this.LastModifyAt = LastModifyAt
  }

  getSections(): WebKeyNote.Section[] {
    return [{ title: '前端学习' + Date.now(), index: 0, text: '', describe: `` },
    { title: '补血来了', index: 1, text: `` },
    { title: '哈哈', index: 2, text: '' },
    { title: '去你妈的', index: 3, text: '' },
    { title: '狗屁', index: 4, text: '' }]
  }
}