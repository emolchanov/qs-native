import { QueryParams, StringifyOptions } from "./types";

const defaultOptions = {
  skipNulls: false,
  addQueryPrefix: false,
};

export function stringify(
  input: QueryParams,
  options: StringifyOptions = defaultOptions
) {
  let URLParams: URLSearchParams;

  if (
    typeof input === "string" ||
    (Array.isArray(input) && Array.isArray(input[0]))
  ) {
    URLParams = new URLSearchParams(input);
  } else {
    let params: Record<string, string> = {};

    for (const key in input) {
      const value = input[key];

      if (value && typeof value.toString === "function") {
        params[key] = value.toString();
      } else if (!options.skipNulls) {
        params[key] = String(value);
      }
    }

    URLParams = new URLSearchParams(params);
  }

  const str = URLParams.toString();

  if (options.addQueryPrefix && str) {
    return "?" + str;
  }

  return str;
}
