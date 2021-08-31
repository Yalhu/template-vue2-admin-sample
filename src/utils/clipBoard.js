// eslint-disable
const Clipboard = (function (window, document, navigator) {
  let textArea
  // 判断是不是ios端
  function isOS () {
    return navigator.userAgent.match(/ipad|iphone/i)
  }
  // 创建文本元素
  function createTextArea (text) {
    textArea = document.createElement('input')
    textArea.innerHTML = text
    textArea.value = text
    textArea.setAttribute('value', text)
    textArea.setAttribute('readonly', 'readonly')
    document.body.appendChild(textArea)
  }
  // 选择内容
  function selectText () {
    let range, selection
    textArea.select()

    if (isOS()) {
      range = document.createRange()
      range.selectNodeContents(textArea)
      selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, 999999)
    }
  }

  // 复制到剪贴板
  function copyToClipboard () {
    let result = false
    try {
      document.execCommand('Copy')
      result = true
    } catch (err) {
      console.log('复制错误！请手动复制！')
      result = false
    }
    document.body.removeChild(textArea)
    return result
  }

  const copy = function (text) {
    createTextArea(text)
    selectText()
    return copyToClipboard()
  }

  return {
    copy: copy
  }
})(window, document, navigator)

export default Clipboard
