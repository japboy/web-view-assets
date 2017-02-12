import { lazyaction, lazyimage, screentop } from './ScrollBinder/index'
import './ScrollBinder/lazyimage.css'
import './ScrollBinder/position.css'
import './scrollevents.css'

function action (element, message) {
  element.textContent = `Hello, ${message()}.`
}

function init (ev) {
  document.removeEventListener(ev.type, init)
  lazyaction('.lazyaction', action, Date.now)
  lazyimage('.lazyimage', 'src')
  screentop('.screentop')
}

document.addEventListener('DOMContentLoaded', init, false)
