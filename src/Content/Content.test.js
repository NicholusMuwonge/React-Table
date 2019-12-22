import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Content from "./PageContent";


configure({ adapter: new Adapter() });

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
