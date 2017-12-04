import { Container } from './container';

const win = document.defaultView;

/**
 * Detect scroll events for elements
 */
export function onScroll(preprocess, process, postprocess) {
  return function (parentSelector, targetSelector, ...args) {
    const container = new Container(parentSelector, targetSelector);
    const targets = container.children;

    if (container.parents.length <= 0 || targets.length <= 0) return;

    function scroll() {
      targets.forEach((target, index) => {
        const differenceX = Math.abs(container.window.scrollOrigin.x - target.positionOrigin.x);
        const differenceY = Math.abs(container.window.scrollOrigin.y - target.positionOrigin.y);

        if (container.window.rect.width * 1.1 > differenceX &&
            container.window.rect.height * 1.1 > differenceY) {
          preprocess(target.element, ...args);
          process(target.element, ...args);
          postprocess(target.element, ...args);
          targets.splice(index, 1); // Remove an item from targets by side effect
          if (targets.length <= 0) container.off('scroll', scroll);
        }
      });
    }

    function overflowX() {
      targets.forEach((target, index) => {
        const differenceX = Math.abs(target.parent.scrollOrigin.x - target.positionOrigin.x);
        const differenceY =
          Math.abs(container.window.scrollOrigin.y - target.parent.positionOrigin.y);

        if (target.parent.rect.width * 1.1 > differenceX &&
            container.window.rect.height * 1.1 > differenceY) {
          preprocess(target.element, ...args);
          process(target.element, ...args);
          postprocess(target.element, ...args);
          targets.splice(index, 1); // Remove an item from targets by side effect
          if (targets.length <= 0) container.off('scroll', overflowX);
        }
      });
    }

    function overflowY() {
      targets.forEach((target, index) => {
        const differenceX =
          Math.abs(container.window.scrollOrigin.x - target.parent.positionOrigin.x);
        const differenceY = Math.abs(target.parent.scrollOrigin.y - target.positionOrigin.y);

        if (container.window.rect.width * 1.1 > differenceX &&
            target.parent.rect.height * 1.1 > differenceY) {
          preprocess(target.element, ...args);
          process(target.element, ...args);
          postprocess(target.element, ...args);
          targets.splice(index, 1); // Remove an item from targets by side effect
          if (targets.length <= 0) container.off('scroll', overflowY);
        }
      });
    }

    if (toString.apply(container.parents[0].element) === '[object Window]') {
      container.on('scroll', scroll);
      scroll();
    } else if (container.parents[0].rect.width < container.parents[0].rect.scrollWidth) {
      container.on('scroll', overflowX);
      overflowX();
    } else if (container.parents[0].rect.height < container.parents[0].rect.scrollHeight) {
      container.on('scroll', overflowY);
      overflowY();
    }
  };
}

/**
 * Detect elements on top of window
 */
export function onTop(preprocess, process, postprocess) {
  return function (selector, ...args) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      const elementRect = element.getBoundingClientRect();
      const elementPositionY = Math.floor(elementRect.top) + (win.scrollY || win.pageYOffset);
      const elementOriginY = elementRect.height + elementPositionY;

      function scroll() {
        const windowScrollY = win.scrollY || win.pageYOffset;

        if (elementOriginY <= windowScrollY) {
          const processArgs = [element, false].concat(args);
          process(...processArgs);
          postprocess(...processArgs);
        } else {
          const processArgs = [element, true].concat(args);
          process(...processArgs);
          postprocess(...processArgs);
        }
      }

      preprocess(...[element].concat(args));
      win.addEventListener('scroll', scroll, false);
      scroll();
    });
  };
}

/**
 *
 */
export function onBottom(preprocess, process, postprocess) {
  return function (selector, ...args) {
    const processArgs = [selector].concat(args);
    preprocess(...processArgs);
    process(...processArgs);
    postprocess(...processArgs);
  };
}
