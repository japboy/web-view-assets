/**
 * 指定日からその月のカレンダー上の残日数を求める
 * @param {Date} date 指定日
 * @param {Number} startDayOfWeek 週始めの曜日 (0 = 日曜, 1 = 月曜...)
 * @return {Number} 日数
 */
export default function numberOfDaysBehind(date, startDayOfWeek = 0) {
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const numberOfThisMonthDays = lastDayOfMonth.getDate() - date.getDate() - 1;
  const numberOfNextMonthDays = 7 - lastDayOfMonth.getDay() - startDayOfWeek;
  const numberOfDays = numberOfThisMonthDays + numberOfNextMonthDays;
  return numberOfDays;
}
