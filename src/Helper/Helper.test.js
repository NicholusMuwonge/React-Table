import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { normaliseDate, normalizeCurrency, compare } from "../Helper";

configure({ adapter: new Adapter() });

describe("Helper", () => {
  it("should return date formated dd.mm.yyyy", () => {
    expect(normaliseDate("2013-12-28T00:00:00+00:00")).toBe("28.12.2013");
  });

  it("should return empty string if NULL is passed", () => {
    expect(normalizeCurrency("NULL")).toBe("");
  });

  it("should return the pattern between keys in a list", () => {
    const testObjectA = {
      project: 1
    };
    const testObjectB = {
      project: 2
    };

    expect(compare(testObjectA, testObjectB)).toEqual(-1);
    expect(compare(testObjectB, testObjectA)).toEqual(1);
  });
});
