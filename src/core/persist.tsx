const queryString = require("query-string");

const data = queryString.parse(window.location.hash);

const MAX_SERIALIZED_LENGTH = 2000;

export function set(key: string, value: string) {
  data[key] = value;
  let serialized = queryString.stringify(data);

  if (serialized.length <= MAX_SERIALIZED_LENGTH) {
    window.location.hash = serialized;
  } else {
    window.location.hash = "";
  }
}

export function get(key: string): undefined | string {
  return data[key];
}

export function has(key: string): boolean {
  return data[key] ? true : false;
}
