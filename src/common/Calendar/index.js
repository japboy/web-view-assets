/**
 * カレンダー共通コンポーネント
 *
 * カレンダーや日付に関する処理を行うコンポーネント。
 *
 * - DOM 書き換えや副作用の発生する業務要件寄りの処理は置かない。
 * - クラスオブジェクトは置かない。
 * - 関数単位でファイルを分ける。
 */

export { default as numberOfDaysBefore } from './numberOfDaysBefore';
export { default as numberOfDaysBehind } from './numberOfDaysBehind';
export { default as numberOfDaysBetween } from './numberOfDaysBetween';
export { default as numberOfWeeksBetween } from './numberOfWeeksBetween';
export { default as range } from './range';
