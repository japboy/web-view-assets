import numberOfDaysBetween from './numberOfDaysBetween';

/**
 * 指定期間内の週数を求める
 * @param {Date} minDate 開始日
 * @param {Date} maxDate 終了日
 * @param {Number} startDayOfWeek 週始めの曜日 (0 = 日曜, 1 = 月曜...)
 * @return {Number} 週数
 */
export default function numberOfWeeksBetween(minDate, maxDate, startDayOfWeek = 0) {
  const numberOfDays = numberOfDaysBetween(minDate, maxDate);
  // eslint-disable-next-line no-mixed-operators
  const firstWeekDay = (minDate.getDay() - startDayOfWeek + 7) % 7;
  const used = firstWeekDay + numberOfDays;
  return Math.ceil(used / 7);
}
