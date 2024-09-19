// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isObject = (value: any) => {
  return value !== null && typeof value === "object";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isString = (value: any) => {
  return typeof value === "string";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isArray = (value: any) => {
  return Array.isArray(value);
};

export { isObject, isString, isArray };
