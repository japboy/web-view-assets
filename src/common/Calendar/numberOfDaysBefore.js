/**
 * 指定日までのその月のカレンダー上の日数を求める
 * @param {Date} date 指定日
 * @param {Number} startDayOfWeek 週始めの曜日 (0 = 日曜, 1 = 月曜...)
 * @return {Number} 日数
 */
export default function numberOfDaysBefore(date, startDayOfWeek = 0) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const numberOfLastMonthDays = firstDayOfMonth.getDay() - startDayOfWeek;
  const numberOfThisMonthDays = date.getDate() - 1;
  const numberOfDays = numberOfLastMonthDays + numberOfThisMonthDays;
  return numberOfDays;
}
