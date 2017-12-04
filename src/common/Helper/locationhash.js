export default function locationHash() {
  const href = global.location.href;
  const pattern = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  return {
    href: href.replace(pattern, '$&'),
    protocol: href.replace(pattern, '$2'),
    host: href.replace(pattern, '$4'),
    pathname: href.replace(pattern, '$5'),
    search: href.replace(pattern, '$7'),
    hash: href.replace(pattern, '$9'),
  };
}
