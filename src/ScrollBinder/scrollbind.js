const win = document.defaultView
const doc = document.documentElement

/**
 *
 */
export function scrollBind (preproc, proc, postproc) {
  return function (selector, ...args) {
    const elements = document.querySelectorAll(selector)

    Array.from(elements, function (element) {
      const procargs = [ element ].concat(args)
      const rect = element.getBoundingClientRect()
      const elementX = (rect.top + win.pageYOffset - doc.clientTop) + Math.floor(rect.height / 2)

      function scroll (ev = { type: scroll }) {
        const height = win.innerHeight
        const scrollX = (doc.scrollTop || document.body.scrollTop) + Math.floor(height / 2)
        const differenceX = Math.abs(scrollX - elementX)

        if (height * 1.1 > differenceX) {
          win.removeEventListener(ev.type, scroll)
          proc.apply(undefined, procargs)
          postproc.apply(undefined, procargs)
        }
      }

      preproc.apply(undefined, procargs)
      win.addEventListener('scroll', scroll, false)
      scroll()
    })
  }
}

/**
 *
 */
export function topPositionBind (preproc, proc, postproc) {
  return function (selector, ...args) {
    const elements = document.querySelectorAll(selector)

    Array.from(elements, function (element) {
      const rect = element.getBoundingClientRect()
      const elementX = rect.top + win.pageYOffset - doc.clientTop
      let procargs = [ element ].concat(args)

      function scroll (ev = { type: scroll }) {
        const scrollX = doc.scrollTop || document.body.scrollTop

        if (elementX + rect.height <= scrollX) {
          procargs = [ element, false ].concat(args)
          proc.apply(undefined, procargs)
          postproc.apply(undefined, procargs)
        } else {
          procargs = [ element, true ].concat(args)
          proc.apply(undefined, procargs)
          postproc.apply(undefined, procargs)
        }
      }

      preproc.apply(undefined, procargs)
      win.addEventListener('scroll', scroll, false)
      scroll()
    })
  }
}

/**
 *
 */
export function bottomPositionBind (preproc, proc, postproc) {
  return function (selector, ...args) {}
}
