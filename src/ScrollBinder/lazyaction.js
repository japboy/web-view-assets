import { scrollBind } from './scrollbind'

function preprocess () {}

function process (element, callback, ...args) {
  callback(...[element].concat(args))
}

function postprocess () {}

const lazyaction = scrollBind(preprocess, process, postprocess)

export default lazyaction
