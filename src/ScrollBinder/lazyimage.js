import { scrollBind } from './scrollbind'

function preproc (element) {
  element.setAttribute('aria-hidden', 'true')
}

function proc (element, dataname) {
  element.addEventListener('load', function load (ev) {
    element.removeEventListener(ev.type, load)
    element.setAttribute('aria-hidden', 'false')
  }, false)
  element.setAttribute('src', element.dataset[dataname])
}

function postproc (element) {}

export const lazyimage = scrollBind(preproc, proc, postproc)
