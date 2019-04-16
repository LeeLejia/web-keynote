declare namespace WebKeyNote {
  
  type GlobalState = {
    sectionProvider: { setData: (treeData: WebKeyNote.Section[]) => void },
    previewProvider: { preview: (section: WebKeyNote.Section) => (Promise<void>)}
  }

  export const enum Command {
    WEBSLIDE = 'extension.WebKeyNote',
    OPEN_DOC = 'extension.open_doc',
    OPEN_SECTION = 'extension.open_section',
    OPEN_DOC_EDITOR = 'extension.open_doc_editor',
    OPEN_SECTION_SECTION = 'extension.open_section_editor',
  }

  interface Doc {
    title: string,
    getSections(): WebKeyNote.Section[],
    renderHTML(): string
  }
  interface Section {
    title: string,
    text: string,
    index: number,
    describe?: string,
    renderHTML(): string
  }

  type Attribute = { key: string, type: TokenType | 'ClassList', val: string | number | boolean | string[] }
  type Node = {
    name: string,
    classList: string[],
    attributes: Attribute[],
    childNodes: Node[]
  }

  export const enum TokenType {
    Brace = 'Brace',
    Number = 'Number',
    String = 'String',
    Boolean = 'Boolean',
    Symbol = 'Symbol',
    Keyword = 'Keyword',
    Annotation = 'Annotation'
  }
}

// 覆盖vscode定义
declare namespace vscode {
  export interface Memento {
    get<T extends keyof WebKeyNote.GlobalState>(key: T): WebKeyNote.GlobalState[T] | undefined
  
    get<T extends keyof WebKeyNote.GlobalState>(key: T, defaultValue: WebKeyNote.GlobalState[T]): WebKeyNote.GlobalState[T]
  
    update<T extends keyof WebKeyNote.GlobalState>(key: T, value: WebKeyNote.GlobalState[T]): Thenable<void>
  }
}
