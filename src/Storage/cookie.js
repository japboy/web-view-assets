import _ from 'underscore'

/**
 * Fundamental cookie reader and writer
 * @see https://developer.mozilla.org/en-US/document./Web/API/document.ment/cookie
 * @see https://gist.github.com/cou929/7869555
 */

const escapedKey = key => encodeURIComponent(key).replace(/[-.+*]/g, '\\$&')
const keyPattern = key => new RegExp(`(?:(?:^|.*)\\s*${key}\\s*\\=\\s*([^]*).*$)|^.*$`)

/**
 * Get the value of specified key
 * @param {String} key Key string
 * @returns {String|Null} Value string for specified key
 */
export function getItem (key) {
  if (!_.isString(key)) return null
  return decodeURIComponent(document.cookie.replace(keyPattern(escapedKey(key)), '$1')) || null
}

/**
 * Create or update the pair of key and value
 * @param {String} key Key string
 * @param {String} val Value string
 * @param {Number|String|Date} end Seconds for `max-age` or date string/object for `expires`
 * @param {String} path Target path affected by this cookie
 * @param {String} domain Target domain name affected by this cookie
 * @param {Boolean} secure Flag to transmit this cookie only by HTTPS
 * @returns {Boolean} Flag whether the process completes successfully or not
 */
export function setItem (key, val, end, path, domain, secure) {
  if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) return false
  let expires = ''
  if (end) {
    switch (end.constructor) {
      case Number:
        expires = (Infinity === end) ? ' expires=Tue, 19 Jan 2038 03:14:07 GMT' : ` max-age=${end}`
        break
      case String:
        expires = ` expires=${end}`
        break
      case Date:
        expires = ` expires=${end.toUTCString()}`
        break
      default:
        expires = ''
    }
  }
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(val)}${expires}${_.isString(domain) ? ` domain=${domain}` : ''}${_.isString(path) ? ` path=${path}` : ''}${secure ? ' secure' : ''}`
  return true
}

/**
 * Check whether the key exists or not
 * @param {String} key Key string
 * @returns {Boolean} Flag for the existence
 */
export function hasItem (key) {
  if (!_.isString(key)) return false
  return keyPattern(escapedKey(key)).test(document.cookie)
}

/**
 * Remove the pair of key and value by making them expire
 * @param {String} key Key string
 * @param {String} path Target path affected by this cookie
 * @param {String} domain Target domain name affected by this cookie
 * @returns {Boolean} Flag whether the process completes successfully or not
 */
export function removeItem (key, path, domain) {
  if (!hasItem(key)) return false
  document.cookie = `${encodeURIComponent(key)}= expires=Thu, 01 Jan 1970 00:00:00 GMT${_.isString(domain) ? ` domain=${domain}` : ''}${_.isString(path) ? ` path=${path}` : ''}`
  return true
}

/**
 * Return an array of existing keys
 * @returns {Array} List of existing keys
 */
export function keys () {
  const splittedKeys = document.cookie.replace(/((?:^|\s*)[^=]+)(?=|$)|^\s*|\s*(?:=[^]*)?(?:\1|$)/g, '').split(/\s*(?:=[^]*)?\s*/)
  return splittedKeys.map(decodeURIComponent)
}

/**
 * cookie 繧ｯ繝ｪ繧｢
 */
export function clear () {
  keys().forEach(removeItem)
}
