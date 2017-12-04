/**
 * ScrollAction: lazyaction function
 */

import { onScroll } from './scrollaction';

function preprocess() {}

function process(element, action, ...args) {
  action(...[element].concat(args));
}

function postprocess() {}

/**
 * Bind callback function which will be triggered by DOM selector on screen.
 *
 * @param {string} target - DOM selector to be binded for scroll event.
 * @param {function} callback - Callback function which runs when the target selector is on screen.
 * @param {{parent: string|Object}} [options={parent: window}] - Options which may specify parent selector.
 * @param {...Object} [args] - Parameters which may be passed to the callback function.
 */
export default function lazyaction(target, callback, ...args) {
  const options = Object.assign({
    parent: window,
  }, args[args.length - 1]);

  return onScroll(preprocess, process, postprocess)(options.parent, target, callback, ...args);
}
