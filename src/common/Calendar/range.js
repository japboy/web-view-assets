import numberOfDaysBetween from './numberOfDaysBetween';
import numberOfDaysBefore from './numberOfDaysBefore';
import numberOfDaysBehind from './numberOfDaysBehind';

/**
 * 指定開始日のカレンダーの頭から終了日までの日時を格納した配列を返す
 * @param {Date} minDate 開始日
 * @param {Date} maxDate 終了日
 * @param {Boolean} includesBeforeAndBehind カレンダー上の前後の月の日を含める
 * @param {Number} startDayOfWeek 週始めの曜日 (0 = 日曜, 1 = 月曜...)
 * @return {Array<Date>} カレンダーに沿った開始日から終了日までの配列
 */
export default function range(minDate, maxDate, includesBeforeAndBehind = true, startDayOfWeek = 0) {
  const numberOfDaysBeforeBegin = numberOfDaysBefore(minDate, startDayOfWeek);
  const numberOfDaysBehindEnd = numberOfDaysBehind(maxDate, startDayOfWeek);
  const numberOfDays = includesBeforeAndBehind ?
    numberOfDaysBeforeBegin + numberOfDaysBetween(minDate, maxDate) + numberOfDaysBehindEnd :
    numberOfDaysBetween(minDate, maxDate);

  const dates = Array.from(Array(numberOfDays), (_, i) => {
    const date = new Date(minDate);

    if (i < numberOfDaysBeforeBegin) {
      const decrementNumberOfDays = numberOfDaysBeforeBegin - i;
      date.setDate(date.getDate() - decrementNumberOfDays);
    } else {
      const incrementNumberOfDays = i - numberOfDaysBeforeBegin;
      date.setDate(date.getDate() + incrementNumberOfDays);
    }

    return date;
  });

  return dates;
}
