import styles from './ButtonBold.module.css'

type ButtonBoldProps = {
  content: string
  onChange: (newContent: string) => void
}

export default function ButtonBold({ content, onChange }: ButtonBoldProps) {
  const handleGetSelection = () => {
    const selection = window.getSelection()
    const previewContainer = document.getElementById('preview_container')
    const fullTextContainer = document.getElementById('fulltext_container')

    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const selectedText = selection.toString()
    const anchorNode = selection.anchorNode
    const isInsidePreview = previewContainer?.contains(anchorNode)
    const isInsideFullText = fullTextContainer?.contains(anchorNode)

    if (!(isInsidePreview || isInsideFullText) || !selectedText) return

    let parent = anchorNode?.parentElement
    let isBold = false
    while (parent) {
      if (parent.tagName?.toLowerCase() === 'b') {
        isBold = true
        break
      }
      parent = parent.parentElement
    }

    if (isBold) {
      const bElement = parent!
      const textNode = document.createTextNode(bElement.textContent || '')
      bElement.replaceWith(textNode)
    } else {
      const b = document.createElement('b')
      b.textContent = selectedText
      range.deleteContents()
      range.insertNode(b)
    }
    let updatedHTML:string
    if (isInsidePreview){
      updatedHTML = previewContainer?.children[0]?.innerHTML || ''
    }else{
      updatedHTML = fullTextContainer?.innerHTML || ''
    }
    onChange(updatedHTML)

  }


  return (
    <div className={styles.btn_container}>
      <input
        type="button"
        value="B"
        className={styles.btn_input}
        onClick={handleGetSelection}
      />
    </div>
  )
}
