import { expand } from './Accordion/index';
import './Accordion/expand.css';
import './main.css';

function init() {
  expand('.expand-container', '.expand-summary', '.expand-content', '.expand-trigger');
}

init();
