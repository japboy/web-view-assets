import { elementSize } from '../Helper/index';

export default function expand(parentSelector, summarySelector, contentSelector, triggerSelector) {
  const elements = document.querySelectorAll(parentSelector);

  // eslint-disable-next-line array-callback-return
  Array.from(elements, (element) => {
    const elementRect = element.getBoundingClientRect();
    const summaryElement = element.querySelector(summarySelector);
    const summaryElementSize = elementSize(summaryElement);
    const contentElement = element.querySelector(contentSelector);
    const contentElementSize = elementSize(contentElement);
    const triggerElement = element.querySelector(triggerSelector);
    const triggerElementSize = elementSize(triggerElement);

    // eslint-disable-next-line no-param-reassign
    element.style.height = `${elementRect.height}px`;

    function click(ev) {
      ev.preventDefault();
      triggerElement.removeEventListener(ev.type, click);

      const expandedHeight = (elementRect.height - summaryElementSize.height - triggerElementSize.height) + contentElementSize.height;

      summaryElement.setAttribute('aria-hidden', 'true');
      contentElement.setAttribute('aria-hidden', 'false');
      triggerElement.setAttribute('aria-hidden', 'true');

      setTimeout(() => {
        element.setAttribute('aria-expanded', 'true');
        // eslint-disable-next-line no-param-reassign
        element.style.height = `${expandedHeight}px`;
      }, 10);
    }

    triggerElement.addEventListener('click', click, false);
  });
}
