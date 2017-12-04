/**
 * ScrollAction: lazyimage function
 */

import { onScroll } from './scrollaction';

function preprocess(element) {
  element.setAttribute('aria-hidden', 'true');
}

function process(element, dataname) {
  element.addEventListener('load', function load(ev) {
    element.removeEventListener(ev.type, load);
    element.setAttribute('aria-busy', 'false');
    element.setAttribute('aria-hidden', 'false');
  }, false);
  const dataattr = element.dataset[dataname];
  element.setAttribute('src', dataattr);
  element.setAttribute('aria-busy', 'true');
}

function postprocess(element, dataname) {
  element.removeAttribute(`data-${dataname}`);
}

/**
 * Bind `<img>` element which will be loaded by DOM selector on screen.
 *
 * @param {string} target - DOM selector to be binded for scroll event.
 * @param {string} dataname - Name of `data-` attribute which is replaced by the actual attribute when the target selector is on screen.
 * @param {{parent: string|Object}} [options={parent: window}] - Options which may specify parent selector.
 */
export default function lazyimage(target, dataname, options = { parent: window }) {
  return onScroll(preprocess, process, postprocess)(options.parent, target, dataname);
}
