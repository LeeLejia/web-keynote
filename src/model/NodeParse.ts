
function example(node: WebKeyNote.Node): string {

  return ''
}

// type,content,color
function text(node: WebKeyNote.Node): string {
  let type: string = 'p'
  let content: string = ''
  let color: string = 'black'
  node.attributes.forEach(attr => {
    if (attr.key === 'type') {
      type = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(String(attr.val)) === -1 ? 'p' : String(attr.val)
    } else if (attr.key === 'content') {
      content = String(attr.val)
    } else if(attr.key === 'color') {
      color = String(attr.val)
    }
  })
  return `<${type} class="${node.classList.join(' ')}" ${color && ("style='color:"+color+";'")}>${content}</${type}>`
}

function list(node: WebKeyNote.Node): string {

  return ''
}

function layout(node: WebKeyNote.Node): string {

  return ''
}


function code(node: WebKeyNote.Node): string {

  return ''
}


const parseMap: { [key: string]: (node: WebKeyNote.Node) => string } = {
  text,
  list,
  layout,
  code
}
export default parseMap