import { stringify } from "../src/stringify";

describe("stringify()", () => {
  it("stringifies a querystring object", () => {
    expect(stringify({ a: "b" })).toEqual("a=b");
    expect(stringify({ a: 1 })).toEqual("a=1");
    expect(stringify({ a: 1, b: 2 })).toEqual("a=1&b=2");
    expect(stringify({ a: "A_Z" })).toEqual("a=A_Z");
    expect(stringify({ a: "€" })).toEqual("a=%E2%82%AC");
    expect(stringify({ a: "" })).toEqual("a=%EE%80%80");
    expect(stringify({ a: "א" })).toEqual("a=%D7%90");
    expect(stringify({ a: "𐐷" })).toEqual("a=%F0%90%90%B7");
  });

  it("stringifies falsy values", () => {
    expect(stringify(undefined)).toEqual("");
    expect(stringify(null)).toEqual("");
  });

  it("stringifies string arrays", () => {
    expect(
      stringify([
        ["a", "b"],
        ["c", "d"],
      ])
    ).toEqual("a=b&c=d");
  });

  it("stringifies bigints", () => {
    expect(stringify({ a: BigInt(3) })).toEqual("a=3");
  });

  it("adds query prefix", () => {
    expect(stringify({ a: "b" }, { addQueryPrefix: true })).toEqual("?a=b");
  });

  it("with query prefix, outputs blank string given an empty object", () => {
    expect(stringify({}, { addQueryPrefix: true })).toEqual("");
  });

  it("omits nulls when asked", () => {
    expect(stringify({ a: "b", c: null })).toEqual("a=b&c=null");
    expect(stringify({ a: "b", c: null }, { skipNulls: true })).toEqual("a=b");
  });

  it("stringifies an empty value", () => {
    expect(stringify({ a: "" })).toEqual("a=");
    expect(stringify({ a: null })).toEqual("a=null");
    expect(stringify({ a: "", b: "" })).toEqual("a=&b=");
    expect(stringify({ a: null, b: "" })).toEqual("a=null&b=");
  });

  it("stringifies a null object", () => {
    const obj = Object.create(null);
    obj.a = "b";
    expect(stringify(obj)).toEqual("a=b");
  });

  it("returns an empty string for invalid input", () => {
    expect(stringify(undefined)).toEqual("");
    expect(stringify(null)).toEqual("");
    expect(stringify("")).toEqual("");
  });

  it("drops keys with a value of undefined", () => {
    expect(stringify({ a: undefined })).toEqual("a=undefined");
  });

  it("url encodes values", () => {
    expect(stringify({ a: "b c" })).toEqual("a=b+c");
  });

  it("encodes a date", () => {
    const now = new Date().toISOString();
    const str = "a=" + encodeURIComponent(now);
    expect(stringify({ a: now })).toEqual(str);
  });

  it("stringifies the weird object from qs", () => {
    expect(stringify({ "my weird field": "~q1!2\"'w$5&7/z8)?" })).toEqual(
      "my+weird+field=%7Eq1%212%22%27w%245%267%2Fz8%29%3F"
    );
  });

  it("stringifies boolean values", () => {
    expect(stringify({ a: true })).toEqual("a=true");
    expect(stringify({ b: false })).toEqual("b=false");
  });
});
