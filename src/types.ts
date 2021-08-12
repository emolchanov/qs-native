export type QueryParams =
  | string
  | string[][]
  | Record<string, string | number | bigint | boolean>;

export type ParsedQuery = Record<string, string>;

export interface StringifyOptions {
  skipNulls?: boolean;
  addQueryPrefix?: boolean;
}

export interface ParseOptions {
  strictNullHandling: boolean;
}
