import { scrollBind } from './scrollbind'

function preprocess (element) {
  element.setAttribute('aria-hidden', 'true')
}

function process (element, dataname) {
  element.addEventListener('load', function load (ev) {
    element.removeEventListener(ev.type, load)
    element.setAttribute('aria-hidden', 'false')
  }, false)
  element.setAttribute('src', element.dataset[dataname])
}

function postprocess () {}

const lazyimage = scrollBind(preprocess, process, postprocess)

export default lazyimage
