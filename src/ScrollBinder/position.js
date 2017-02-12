import { topPositionBind, bottomPositionBind } from './scrollbind'

function preproc () {}

function proc (element, ontop) {
  if (ontop) {
    element.classList.remove('screentop-fixed')
  } else {
    element.classList.add('screentop-fixed')
  }
}

function postproc () {}

export const screentop = topPositionBind(preproc, proc, postproc)
export const screenbottom = bottomPositionBind(preproc, proc, postproc)
