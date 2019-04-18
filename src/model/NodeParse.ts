import * as vscode from 'vscode'

const classMap: { [key: string]: { [key: string]: string } } = {
  text: {
    // 'text-center': 'aligncenter'
  }
}

// example
function example(node: WebKeyNote.Node): string {
  const [content] = readAttributes(node.attributes, ['content']) 
  return ``
}


// class 名字映射
function classMapping(nodeType: string, classList: Array<string>): Array<string> {
  const m = classMap[nodeType]
  if(!m) {
    return classList
  }
  const result = classList.map(item => m[item] || item)
  return result
}

// 解析节点
function parseNode(node: WebKeyNote.Node): string {
  const parse = parseMap[node.name]
  if(!parse) {
    console.warn(`不存在名称为${node.name}的节点类型`)
    vscode.window.showInformationMessage(`不存在名称为${node.name}的节点类型`)
    return ''
  }
  return parse(node) || ''
}

// 解析变量
function parseStrVar(rawStr: string): string {
  return rawStr.replace(/\$\{\s*(.+)\s*\}/,(a, b) =>{
    if(b && b.toLowerCase().startsWith('random')) { // ${random:800x600?猫,狗}
      const mc = /\$\{\s*random\s*:(.+)\s*\}/i.exec(b)
      if(!mc || mc.length < 2) {
        return 'https://source.unsplash.com/random'
      }
      if(mc[1].indexOf('?')) {
        return 'https://source.unsplash.com/' + mc[1]
      } else {
        return 'https://source.unsplash.com/1600x900?' + mc[1]
      }
    }
    console.warn('找不到变量：' + b)
    return ''
  })
}

// 读取需要的属性
function readAttributes(attrs: WebKeyNote.Attribute[], keys: string[]): WebKeyNote.Attribute[] {
  const result: WebKeyNote.Attribute[]= []
  attrs.forEach(attr => {
    const idx = keys.indexOf(attr.key)
    if(idx === -1)
      return
    result[idx] = attr
  })
  return result
}

// type,content,color
// class 
function text(node: WebKeyNote.Node): string {
  let [type, content, color] = readAttributes(node.attributes, ['type', 'content', 'color'])
  if(type) {
    type.val = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(String(type.val)) === -1 ? 'p' : String(type.val)  
  }
  return `<${type && type.val || 'p'} class="${classMapping('text', node.classList).join(' ')}" ${color && color.val && ("style='color:" + color.val + ";'") || ''}>${content && content.val || ''}</${type && type.val || 'p'} >`
}

// 列表
function list(node: WebKeyNote.Node): string {
  const [type] = readAttributes(node.attributes, ['type']) 
  switch(type && type.val || 'simple') {
    case 'block':
      return `
      <div class="bg-white shadow ${classMapping('ul', node.classList).join(' ')}">
        <ul class="flexblock reasons">
          ${node.childNodes.map(item => `<li>${parseNode(item)}</li>`).join('\n')}
        </ul>
      </div>
      `
    case 'gallery':
      return `
      <ul class="flexblock gallery ${classMapping('ul', node.classList).join(' ')}">
        ${node.childNodes.map(item => `<li>${parseNode(item)}</li>`).join('\n')}
			</ul>
      `
    default: 
      return `<ul class="${classMapping('ul', node.classList).join(' ')}">
        ${node.childNodes.map(item => `<li>${parseNode(item)}</li>`).join('\n')}
      </ul>
      `
  }
}

// 视图容器
function view(node: WebKeyNote.Node): string {
  const [link] = readAttributes(node.attributes, ['link']) 
  return `<div class="${classMapping('view', node.classList).join(' ')}">
      ${(link && link.val)?
        `<a href='${link.val}'>${node.childNodes.map(item => `${parseNode(item)}`).join('\n')}</a>`
        : node.childNodes.map(item => `${parseNode(item)}`).join('\n')
      }
    </div>
    `
}
      

// attribute: content, lang
function code(node: WebKeyNote.Node): string {//javascript
  const [content, lang] = readAttributes(node.attributes, ['content', 'lang']) 
  return `
  <div class="${classMapping('code', node.classList).join(' ')}">
    <pre>
      <code ${lang && lang.val? `class="language-${lang.val}"`: ''}>\n${content && content.val || ''}</code>
    </pre>
  </div>
  `
}

// img url
function img(node: WebKeyNote.Node): string {
  let [url, size] = readAttributes(node.attributes, ['url', 'size']) 
  let w = '', h = ''
  if(size && size.val) {
    [w, h] = String(size.val).split('*')
  }
  return `
    <img class="${classMapping('img', node.classList).join(' ')}"
      ${w && `style="width:${w}px;${h && `height:${h}px`}"`}
      src=${url && parseStrVar(String(url.val)) || ''}/>
  `
}

// attribute: 'innerStyle', 'innerHtml'
function component(node: WebKeyNote.Node): string {
  const [innerStyle, innerHtml] = readAttributes(node.attributes, ['innerStyle', 'innerHtml']) 
  return `
    ${innerStyle && `
    <style> 
      ${innerStyle}
    </style>
    ` || ''}
    ${innerHtml && `
    <style> 
      ${innerHtml}
    </style>
    ` || ''}
  `
}

const parseMap: { [key: string]: (node: WebKeyNote.Node) => string } = {
  text,
  list,
  code,
  img,
  view,
  component
}
export default parseMap