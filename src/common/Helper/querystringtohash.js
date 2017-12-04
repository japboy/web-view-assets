export default function querystringToHash(querystring) {
  /* eslint-disable no-cond-assign */
  const queryPattern = /([^&=]+)=?([^&]*)/g;
  const decodePattern = /\+/g; // Regex for replacing addition symbol with a space
  const decode = str => decodeURIComponent(str.replace(decodePattern, ' '));
  const parameters = {};
  let expr;
  while (expr = queryPattern.exec(querystring)) {
    let key = decode(expr[1]);
    const value = decode(expr[2]);
    if (key.substring(key.length - 2) === '[]') {
      key = key.substring(0, key.length - 2);
      (parameters[key] || (parameters[key] = [])).push(value);
    } else {
      parameters[key] = value;
    }
  }
  return parameters;
}
