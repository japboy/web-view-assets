import { topPositionBind, bottomPositionBind } from './scrollbind'

function preprocess () {}

function process (element, ontop) {
  if (ontop) {
    element.classList.remove('screentop-fixed')
  } else {
    element.classList.add('screentop-fixed')
  }
}

function postprocess () {}

export const screentop = topPositionBind(preprocess, process, postprocess)
export const screenbottom = bottomPositionBind(preprocess, process, postprocess)
