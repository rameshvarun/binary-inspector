const queryString = require("query-string");

const data = queryString.parse(window.location.hash);

export function set(key: string, value: string) {
  data[key] = value;
  window.location.hash = queryString.stringify(data);
}

export function get(key: string): undefined | string {
  return data[key];
}

export function has(key: string): boolean {
  return data[key] ? true : false;
}
