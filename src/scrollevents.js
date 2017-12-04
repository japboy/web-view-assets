import { lazyaction, lazyimage, stickyheader } from '~/common/ScrollAction/index';
import '~/common/ScrollAction/lazyimage.css';
import '~/common/ScrollAction/stickyheader.css';

function action(element, now) {
  // eslint-disable-next-line no-param-reassign
  element.textContent = `Hello, ${now()}.`;
}

function init() {
  lazyaction('.lazyaction', action, Date.now);
  lazyimage('.horizontal-scroll-box .lazyimage', 'src', { parent: '.horizontal-scroll-box' });
  lazyimage('.vertical-scroll-area .lazyimage', 'src');
  lazyimage('.vertical-scroll-box .lazyimage', 'src', { parent: '.vertical-scroll-box' });
  stickyheader('.stickyheader');
  console.log('Done.');
}

init();
