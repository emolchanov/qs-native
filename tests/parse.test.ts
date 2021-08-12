import { parse } from "../src/parse";

describe("parse()", () => {
  it("parses a simple string", () => {
    expect(parse("0=foo")).toEqual({ 0: "foo" });
    expect(parse("foo=c++")).toEqual({ foo: "c  " });
    expect(parse("foo", { strictNullHandling: true })).toEqual({ foo: null });
    expect(parse("foo")).toEqual({ foo: "" });
    expect(parse("foo=")).toEqual({ foo: "" });
    expect(parse("foo=bar")).toEqual({ foo: "bar" });
    expect(parse(" foo = bar = baz ")).toEqual({ " foo ": " bar = baz " });
    expect(parse("foo=bar=baz")).toEqual({ foo: "bar=baz" });
    expect(parse("foo=bar&bar=baz")).toEqual({ foo: "bar", bar: "baz" });
    expect(parse("foo2=bar2&baz2=")).toEqual({ foo2: "bar2", baz2: "" });
    expect(parse("foo=bar&baz", { strictNullHandling: true })).toEqual({
      foo: "bar",
      baz: null,
    });
    expect(parse("foo=bar&baz")).toEqual({ foo: "bar", baz: "" });
    expect(parse("cht=p3&chd=t:60,40&chs=250x100&chl=Hello|World")).toEqual({
      cht: "p3",
      chd: "t:60,40",
      chs: "250x100",
      chl: "Hello|World",
    });
  });

  it("dot notation", () => {
    expect(parse("a.b=c")).toEqual({ "a.b": "c" });
  });

  it("supports encoded = signs", () => {
    expect(parse("he%3Dllo=th%3Dere")).toEqual({ "he=llo": "th=ere" });
  });

  it("allows brackets in the value", () => {
    expect(parse('pets=["tobi"]')).toEqual({ pets: '["tobi"]' });
    expect(parse('operators=[">=", "<="]')).toEqual({
      operators: '[">=", "<="]',
    });
  });

  it("allows empty values", () => {
    expect(parse("")).toEqual({});
    expect(parse(null)).toEqual({});
    expect(parse(undefined)).toEqual({});
  });

  it("supports malformed uri characters", () => {
    expect(parse("{%:%}", { strictNullHandling: true })).toEqual({
      "{%:%}": null,
    });
    expect(parse("{%:%}=")).toEqual({ "{%:%}": "" });
    expect(parse("foo=%:%}")).toEqual({ foo: "%:%}" });
  });

  it("doesn't produce empty keys", () => {
    expect(parse("_r=1&")).toEqual({ _r: "1" });
  });

  it("continues parsing when no parent is found", () => {
    expect(parse("[]=&a=b")).toEqual({ "[]": "", a: "b" });
    expect(parse("[]&a=b", { strictNullHandling: true })).toEqual({
      "[]": null,
      a: "b",
    });
    expect(parse("[foo]=bar")).toEqual({ "[foo]": "bar" });
  });

  it("does not error when parsing a very long string", () => {
    var str = "a=string";
    while (Buffer.byteLength(str) < 128 * 1024) {
      str = str + "&" + str;
    }

    expect(() => {
      parse(str);
    }).not.toThrow();
  });

  it("allows for query string prefix", () => {
    expect(parse("?foo=bar")).toEqual({
      foo: "bar",
    });
    expect(parse("foo=bar")).toEqual({
      foo: "bar",
    });
  });

  it("can allow overwriting prototype properties", () => {
    expect(parse("a[hasOwnProperty]=b")).toEqual({ "a[hasOwnProperty]": "b" });
    expect(parse("hasOwnProperty=b")).toEqual({ hasOwnProperty: "b" });
    expect(parse("toString")).toEqual({ toString: "" });
  });

  it("params starting with a closing bracket", () => {
    expect(parse("]=toString")).toEqual({ "]": "toString" });
    expect(parse("]]=toString")).toEqual({ "]]": "toString" });
    expect(parse("]hello]=toString")).toEqual({ "]hello]": "toString" });
  });

  it("params starting with a starting bracket", () => {
    expect(parse("[=toString")).toEqual({ "[": "toString" });
    expect(parse("[[=toString")).toEqual({ "[[": "toString" });
    expect(parse("[hello[=toString")).toEqual({ "[hello[": "toString" });
  });
});
