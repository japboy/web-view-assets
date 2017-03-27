/**
 * JavaScript helper functions
 */

/**
 * Get width & height of hidden element
 */
export function elementSize (el) {
  /* eslint-disable no-param-reassign */
  const style = global.getComputedStyle(el)
  const styleDisplay = style.display
  const styleMaxHeight = style.maxHeight.replace(/(px|%)/, '')
  const styleMaxWidth = style.maxWidth.replace(/(px|%)/, '')

  const size = { height: 0, width: 0 }

  // if its not hidden we just return normal size
  if (styleDisplay !== 'none' && styleMaxHeight !== '0') {
    size.height = el.offsetHeight
  }
  if (styleDisplay !== 'none' && styleMaxWidth !== '0') {
    size.width = el.offsetWidth
  }
  if (styleDisplay !== 'none' && styleMaxHeight !== '0' && styleMaxWidth !== '0') {
    return size
  }

  // the element is hidden so:
  // making the el block so we can meassure its height but still be hidden
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.display = 'block'

  size.height = el.offsetHeight
  size.width = el.offsetWidth

  // reverting to the original values
  el.style.display = ''
  el.style.position = ''
  el.style.visibility = ''

  return size
}

export function eventTrigger (element, eventname) {
  const event = document.createEvent('HTMLEvents')
  event.initEvent(eventname, true, true)
  return element.dispatchEvent(event)
}

export function locationHash () {
  const href = global.location.href
  const pattern = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
  return {
    href: href.replace(pattern, '$&'),
    protocol: href.replace(pattern, '$2'),
    host: href.replace(pattern, '$4'),
    pathname: href.replace(pattern, '$5'),
    search: href.replace(pattern, '$7'),
    hash: href.replace(pattern, '$9')
  }
}

export function querystringToHash (querystring) {
  /* eslint-disable no-cond-assign */
  const queryPattern = /([^&=]+)=?([^&]*)/g
  const decodePattern = /\+/g  // Regex for replacing addition symbol with a space
  const decode = str => decodeURIComponent(str.replace(decodePattern, ' '))
  const parameters = {}
  let expr
  while (expr = queryPattern.exec(querystring)) {
    let key = decode(expr[1])
    const value = decode(expr[2])
    if (key.substring(key.length - 2) === '[]') {
      key = key.substring(0, key.length - 2);
      (parameters[key] || (parameters[key] = [])).push(value)
    } else {
      parameters[key] = value
    }
  }
  return parameters
}
