import Vue from 'vue';

import { VerticalDatepicker } from '~/common/Datepicker/index';

const datepicker = new Vue({
  render(createElement) {
    return createElement(VerticalDatepicker, {
      props: {
      },
    });
  },
});

function init() {
  datepicker.$mount('#datepicker');
}

init();
