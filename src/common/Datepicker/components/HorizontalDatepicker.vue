<template>
  <div
    :class="$style.container">
    <div>
      <div
        v-for="(calendar, index) in calendars"
        :key="index"
        :class="$style.calendar">
        <h1 :class="$style.month">{{ calendar.year }} 年 {{ calendar.month }} 月</h1>

        <div
          :class="$style.days">
          <span
            v-for="(day, index) in days"
            :key="index"
            :class="$style.day">
            {{ day }}
          </span>
        </div>

        <span
          v-for="(date, index) in calendar.dates"
          :key="index"
          :class="[$style.date, $style[date.dayClassName]]">
          {{ date.date.getDate() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { dateRange } from '~/common/Calendar/index';

  // eslint-disable-next-line no-unused-vars
  function range(a, b) {
    return Array.from(Array(b), (_, i) => a + i);
  }

  // eslint-disable-next-line no-unused-vars
  function zerofill(n) {
    return (`0${n}`).slice(-2);
  }

  export default {
    name: 'horizontal-datepicker',
    data() {
      return {
        days: ['日', '月', '火', '水', '木', '金', '土'],
        calendars: [],
        activeMonth: undefined,
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
    },
    created() {
      const startDate = new Date();

      this.activeMonth = startDate.getMonth();

      const calendars = Array.from(Array(3), (_, i) => {
        const currentDate = new Date(startDate);
        currentDate.setMonth(currentDate.getMonth() + i);
        const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const dates = dateRange(currentDate, maxDate).map((date) => {
          const dayClassName = this.dayToClassName(date.getDay());
          const holidayClassName = true ? 'holiday' : '';
          return {
            date,
            dayClassName,
            holidayClassName,
            activated: false,
            selected: false,
          };
        });
        return {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
          dates,
        };
      });

      this.calendars = calendars;
    },
    mounted() {
    },
    beforeDestroy() {
    },
  };
</script>

<style lang="postcss" module>
  @import "~/common/GlobalStyle/index.css";

  .container {
    font-family: var(--base-font-family);
    font-size: var(--base-font-size);
    line-height: var(--base-line-height);
    margin: 0 auto;
    max-width: 300px;
  }

  .calendar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; /* TODO: 列数 5~6 は月で変わるのどうするか */
    height: 300px;
    width: 300px;
  }

  .month {
    /* stylelint-disable declaration-block-no-redundant-longhand-properties */
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 1;
    grid-row-end: 1;
    /* stylelint-enable declaration-block-no-redundant-longhand-properties */
  }

  .days {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    /* stylelint-disable declaration-block-no-redundant-longhand-properties */
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 2;
    grid-row-end: 2;
    /* stylelint-enable declaration-block-no-redundant-longhand-properties */
  }

  .date {
    display: inline-block;

    @nest &:hover {
      background-color: gray;
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
</style>
