const win = document.defaultView

/**
 * Detect elements in window
 */
export function scrollBind (preprocess, process, postprocess) {
  return function (selector, ...args) {
    const elements = document.querySelectorAll(selector)

    Array.from(elements, (element) => {
      const processArgs = [element].concat(args)
      const elementRect = element.getBoundingClientRect()
      const elementPositionY = Math.floor(elementRect.top) + (win.scrollY || win.pageYOffset)
      const elementOriginY = elementPositionY + Math.floor(elementRect.height / 2)

      function scroll (ev = { type: 'scroll' }) {
        const windowHeight = win.innerHeight
        const windowScrollY = win.scrollY || win.pageYOffset
        const windowOriginY = Math.floor(windowHeight / 2) + windowScrollY
        const differenceY = Math.abs(windowOriginY - elementOriginY)

        if (windowHeight * 1.1 > differenceY) {
          win.removeEventListener(ev.type, scroll)
          process(...processArgs)
          postprocess(...processArgs)
        }
      }

      preprocess(...processArgs)
      win.addEventListener('scroll', scroll, false)
      scroll()

      return element
    })
  }
}

/**
 * Detect elements on top of window
 */
export function topPositionBind (preprocess, process, postprocess) {
  return function (selector, ...args) {
    const elements = document.querySelectorAll(selector)

    Array.from(elements, (element) => {
      const elementRect = element.getBoundingClientRect()
      const elementPositionY = Math.floor(elementRect.top) + (win.scrollY || win.pageYOffset)
      const elementOriginY = elementRect.height + elementPositionY

      function scroll () {
        const windowScrollY = win.scrollY || win.pageYOffset

        if (elementOriginY <= windowScrollY) {
          const processArgs = [element, false].concat(args)
          process(...processArgs)
          postprocess(...processArgs)
        } else {
          const processArgs = [element, true].concat(args)
          process(...processArgs)
          postprocess(...processArgs)
        }
      }

      preprocess(...[element].concat(args))
      win.addEventListener('scroll', scroll, false)
      scroll()

      return element
    })
  }
}

/**
 *
 */
export function bottomPositionBind (preprocess, process, postprocess) {
  return function (selector, ...args) {
    const processArgs = [selector].concat(args)
    preprocess(...processArgs)
    process(...processArgs)
    postprocess(...processArgs)
  }
}
