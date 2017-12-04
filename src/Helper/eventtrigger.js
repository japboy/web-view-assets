export default function eventTrigger(element, eventname) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(eventname, true, true);
  return element.dispatchEvent(event);
}
