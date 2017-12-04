const routes = {
  accordions: () => import(/* webpackChunkName: "accordions" */ './accordions'),
  scrollevents: () => import(/* webpackChunkName: "scrollevents" */ './scrollevents'),
};

async function init(event) {
  const page = global.document.body.dataset.page;
  try {
    await routes[page]();
  } catch (error) {
    console.warn(error.message);
  }
}

init();
