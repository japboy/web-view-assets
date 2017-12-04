/**
 * 指定期間内の日数を求める
 * @param {Date} minDate 開始日
 * @param {Date} maxDate 終了日
 * @return {Number} 日数
 */
export default function numberOfDaysBetween(minDate, maxDate) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMillisecs = Math.abs(maxDate.getTime() - minDate.getTime());
  return Math.round(differenceMillisecs / ONE_DAY) + 1;
}
