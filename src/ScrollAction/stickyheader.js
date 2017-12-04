import { onTop } from './scrollaction';

function preprocess() {}

function process(element, ontop) {
  /* eslint-disable no-param-reassign */
  if (ontop) {
    element.setAttribute('aria-label', 'scroll');
    element.style.top = '';
    element.style.transform = '';
  } else {
    const elementRect = element.getBoundingClientRect();
    element.setAttribute('aria-label', 'fixed');
    element.style.top = `-${elementRect.height}px`;
    element.style.transform = `translate3d(0, ${elementRect.height}px, 0)`;
  }
}

function postprocess() {}

const stickyheader = onTop(preprocess, process, postprocess);

export default stickyheader;
