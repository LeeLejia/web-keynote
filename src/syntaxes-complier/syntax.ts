import { TokenStream, Token } from './tokenStream'

export class SyntaxParser {
  ts: TokenStream
  constructor(str: string) {
    this.ts = new TokenStream(str)
  }

  private splitBlock(tokens: Token[]): Token[][] {
    let start = 0
    const tokenSlice = []
    for (let i = 0, braceCount = 0, flag = false; i < tokens.length; i++) {
      if (tokens[i].type === WebKeyNote.TokenType.Brace && tokens[i].val === '{') {
        braceCount++
        if (!flag) {
          flag = true
        }
      } else if (tokens[i].type === WebKeyNote.TokenType.Brace && tokens[i].val === '}') {
        braceCount--
        if (flag && braceCount === 0) {
          tokenSlice.push(tokens.slice(start, i + 1))
          start = i + 1
        }
      }
    }
    return tokenSlice
  }

  private parseNode(tokens: Token[]): WebKeyNote.Node {
    let name = ''
    const attributes: WebKeyNote.Attribute[] = []
    let childNodes: WebKeyNote.Node[] = []
    let classList: string[] = []
    let blockStart = 0
    // read name and class
    for (let i = 0, step = 0, flag = false; i < tokens.length; i++) {
      if (step === 0 && tokens[i].type === WebKeyNote.TokenType.Keyword) {
        name = tokens[i].val
        step = 1
      } else if (step === 1 && !flag && tokens[i].type === WebKeyNote.TokenType.Symbol && tokens[i].val === '.') {
        flag = true
      } else if (step === 1 && flag && tokens[i].type === WebKeyNote.TokenType.Keyword) {
        flag = false
        classList.push(tokens[i].val)
      } else if (step === 1 && !flag && tokens[i].type === WebKeyNote.TokenType.Brace && tokens[i].val === '{') {
        blockStart = i + 1 // 块从这里切割
        break
      } else {
        if(tokens[i].type === WebKeyNote.TokenType.Keyword) {
          i -- 
        }
        name = ''
        classList = []
        step = 0
        flag = false
      }
    }
    // read attribute
    for (let j = blockStart, step = 0, flag = false, cls = [], kw = ''; j + 1 < tokens.length; j++) {
      // 扫描到分号
      if (step === 0 && tokens[j].type === WebKeyNote.TokenType.Symbol && tokens[j].val === ':') {
        if (tokens[j - 1].type === WebKeyNote.TokenType.Keyword) {
          // 读值
          if ([WebKeyNote.TokenType.Number, WebKeyNote.TokenType.String, WebKeyNote.TokenType.Boolean].indexOf(tokens[j + 1].type) !== -1) {
            attributes.push({
              key: tokens[j - 1].val,
              type: tokens[j + 1].type,
              val: tokens[j + 1].val
            })
            j++
          } else if (WebKeyNote.TokenType.Symbol === tokens[j + 1].type && tokens[j + 1].val === '.') {
            // 变成读取类数组模式
            step = 1
            flag = true
            cls = []
            kw = tokens[j - 1].val
            j++
          } else {
            throw new Error('多余的 ":"')
          }
        } else {
          throw new Error('多余的 ":"')
        }
      } else if (step === 1) {
        if (!flag && tokens[j].type === WebKeyNote.TokenType.Symbol && tokens[j].val === '.') {
          flag = true
        } else if (flag && tokens[j].type === WebKeyNote.TokenType.Keyword) {
          flag = false
          cls.push(tokens[j].val)
        } else if (!flag) {
          attributes.push({
            key: kw,
            type: 'ClassList',
            val: cls
          })
          j -- 
          step = 0
        } else {
          throw new Error('多余的 "."')
        }
      } else if (tokens[j].type !== WebKeyNote.TokenType.Keyword) {
        j --
        break
      }
    }
    // read blockList
    const blockList = this.splitBlock(tokens.slice(blockStart))
    childNodes = blockList.map(it=>this.parseNode(it))
    return {
      name,
      classList,
      attributes,
      childNodes,
    }
  }

  parse(): WebKeyNote.Node[] {
    const tokens = this.ts.parse()
    const sections = this.splitBlock(tokens.filter(it => it.type !== WebKeyNote.TokenType.Annotation))
    return sections.map(section => this.parseNode(section))
  }
}


// todo 报错到行