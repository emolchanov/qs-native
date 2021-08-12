import { ParsedQuery, ParseOptions } from "./types";

const defaultOptions = {
  strictNullHandling: false,
};

export function parse<T extends ParsedQuery>(
  queryString: string,
  options: ParseOptions = defaultOptions
) {
  const searchParams = new URLSearchParams(queryString);

  const newParams: ParsedQuery = {};

  searchParams.forEach((value, key) => {
    newParams[key] = options.strictNullHandling ? value || null : value;
  });

  return newParams as T;
}
