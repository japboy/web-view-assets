import { expand } from '~/common/Accordion/index';
import '~/common/Accordion/expand.css';

function init() {
  expand('.expand-container', '.expand-summary', '.expand-content', '.expand-trigger');
}

init();
