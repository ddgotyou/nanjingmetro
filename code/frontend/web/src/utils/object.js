export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function compare(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}