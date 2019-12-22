import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Content from "../Content/PageContent";
import Table from "./TableComponent";
import { normaliseDate, normalizeCurrency, compare } from "../Helper/Helper";

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

describe("<Table/>", () => {
  var wrapper = mount(<Table />);

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  var table = wrapper.find("table");
  it("should have one table element", () => {
    expect(table).toHaveLength(1);
  });

  it("should have number of rows based on data", () => {
    var table = wrapper.find("table");
    const thead = table.find("thead");
    const th = thead.find("th");
    expect(th).toEqual({});
    expect(th).toBeTruthy();
  });
});

describe("<Contnt/>", () => {
  it("should be able to match snapshot", () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should have search bar", () => {
    const wrapper = shallow(<Content />);
    const search = wrapper.find('input[type="search"]');
    expect(search).toHaveLength(1);
  });

  it("should set the search change value", () => {
    const wrapper = shallow(<Content />);
    wrapper.find('input[type="search"]').simulate("change", {
      target: {
        value: "Kryptonite"
      }
    });
    expect(wrapper.find('input[type="search"]').prop("value")).toEqual(
      "Kryptonite"
    );
  });
});
