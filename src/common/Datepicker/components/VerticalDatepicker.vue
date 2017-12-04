<template>
  <div
    :class="$style.wrapper">
    <h1>test</h1>
    <div
      :class="$style.days">
      <span
        v-for="(day, index) in days"
        :key="index"
        :class="$style.day">
        {{ day }}
      </span>
    </div>
    <div
      :class="$style.container">
      <div
        :class="$style.dates"
        :style="datesStyle">
        <span
          v-for="(date, index) in dates"
          :key="index"
          :class="[$style.date, $style[date.dayClassName]]"
          :aria-disabled="date.disabled"
          :aria-selected="date.selected"
          @click="toggle(date)">
          {{ date.date.getDate() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { numberOfWeeksBetween, range } from '~/common/Calendar/index';

  export default {
    name: 'vertical-datepicker',
    data() {
      return {
        days: ['日', '月', '火', '水', '木', '金', '土'],
        dates: [],
        activeMonth: undefined,
        datesStyle: {
          gridTemplateRows: '',
        },
      };
    },
    methods: {
      dayToClassName(day) {
        if (day === 0) {
          return 'sunday';
        } else if (day === 6) {
          return 'saturday';
        }
        return 'weekday';
      },
      toggle(date) {
        if (!date.disabled) {
          // eslint-disable-next-line no-param-reassign
          date.selected = !date.selected;
        }
      },
    },
    created() {
      const minDate = new Date();
      const maxDate = new Date(minDate);
      maxDate.setMonth(minDate.getMonth() + 3);
      maxDate.setDate(0);

      const numberOfWeeks = numberOfWeeksBetween(minDate, maxDate);
      this.datesStyle.gridTemplateRows = Array.from(Array(numberOfWeeks), () => '1fr').join(' ');

      const dates = range(minDate, maxDate).map((date) => {
        const dayClassName = this.dayToClassName(date.getDay());
        const holidayClassName = true ? 'holiday' : '';
        return {
          date,
          dayClassName,
          holidayClassName,
          activated: false,
          selected: false,
          disabled: minDate > date || maxDate < date,
        };
      });

      this.dates = dates;
    },
    mounted() {
    },
    beforeDestroy() {
    },
  };
</script>

<style lang="postcss" module>
  @import "~/common/GlobalStyle/index.css";

  .wrapper {
    font-family: var(--base-font-family);
    font-size: var(--base-font-size);
    line-height: var(--base-line-height);
  }

  .days {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    max-width: 420px;
    margin: auto;
  }

  .container {
    height: 300px;
    margin: auto;
    max-width: 420px;
    overflow: auto;
    position: relative;
  }

  .dates {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr; /* ここは JS で動的に置き変わる */
  }

  .date {
    box-sizing: border-box;
    display: inline-block;
    height: 50px;
    padding: 20px 3px 3px;
    text-align: right;

    @nest &[aria-disabled] {
      color: #ddd;
    }

    @nest &[aria-selected] {
      background-color: pink;
    }
  }

  .sunday {
    background-color: rgb(245, 245, 245);
  }

  .weekday {
    color: black;
  }

  .saturday {
    background-color: rgb(245, 245, 245);
  }

  .holiday {
    background-color: rgb(245, 245, 245);
  }
</style>
