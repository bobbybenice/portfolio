export function getValueFromT<T>(item: T, key?: keyof T) {
  if (!key) {
    return '';
  }

  const val = item[key];

  if (val === null || val === undefined) {
    return '';
  }

  switch (typeof val) {
    case 'number':
      return val.toString();
    case 'string':
      return val;
    default:
      return '';
  }
}
