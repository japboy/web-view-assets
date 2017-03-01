import { elementSize } from '../Helper/index'

export function expand (parentSelector, summarySelector, contentSelector, triggerSelector) {
  const elements = document.querySelectorAll(parentSelector)

  Array.from(elements, (element, index) => {
    const elementRect = element.getBoundingClientRect()
    const summaryElement = element.querySelector(summarySelector)
    const summaryElementSize = elementSize(summaryElement)
    const contentElement = element.querySelector(contentSelector)
    const contentElementSize = elementSize(contentElement)
    const triggerElement = element.querySelector(triggerSelector)
    const triggerElementSize = elementSize(triggerElement)

    element.style.height = `${elementRect.height}px`

    function click (ev) {
      ev.preventDefault()
      triggerElement.removeEventListener(ev.type, click)

      const expandedHeight = (elementRect.height - summaryElementSize.height - triggerElementSize.height) + contentElementSize.height

      summaryElement.setAttribute('aria-hidden', 'true')
      contentElement.setAttribute('aria-hidden', 'false')
      triggerElement.setAttribute('aria-hidden', 'true')

      setTimeout(() => {
        element.setAttribute('aria-expanded', 'true')
        element.style.height = `${expandedHeight}px`
      }, 10)
    }

    triggerElement.addEventListener('click', click, false)
  })
}
