declare namespace WebKeyNote {
  
  type GlobalState = {
    sectionProvider: { setData: (treeData: WebKeyNote.Section[]) => void },
    sectionPreviewProvider: { preview: (section: WebKeyNote.Section) => (Promise<void>)}
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
    text: string,
    describe?: string,
    createdAt?: number,
    LastModifyAt?: number,
    getSections(): WebKeyNote.Section[]
  }
  interface Section {
    title: string,
    text: string,
    index: number,
    describe?: string
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
