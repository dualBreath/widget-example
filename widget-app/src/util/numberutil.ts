const FLOAT_REGEX = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

export function isFloat(value: string) {
  return FLOAT_REGEX.test(value);
}
