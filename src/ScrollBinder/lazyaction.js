import { scrollBind } from './scrollbind'

function preproc () {}

function proc (element, callback, ...args) {
  callback.apply(undefined, [ element ].concat(args))
}

function postproc () {}

export const lazyaction = scrollBind(preproc, proc, postproc)
