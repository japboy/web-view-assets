import { expand } from './Accordion/index'
import './Accordion/expand.css'
import './main.css'

function init (ev) {
  document.removeEventListener(ev.type, init)
  expand('.expand-container', '.expand-summary', '.expand-content', '.expand-trigger')
}

document.addEventListener('DOMContentLoaded', init, false)
