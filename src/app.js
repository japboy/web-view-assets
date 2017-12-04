import './main.css';

const routes = {
  accordions: () => import('./accordions'),
  components: () => import('./components'),
  scrollevents: () => import('./scrollevents'),
};

async function init() {
  const page = global.document.body.dataset.page;
  const route = routes[page];
  try {
    if (page && route) {
      await route();
    }
  } catch (error) {
    console.warn(error.message);
  }
}

init();
