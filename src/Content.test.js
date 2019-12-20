import React from 'react'
import { unmountComponentAtNode } from "react-dom";

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import Content, { normaliseDate, normalizeCurrency } from "./PageContent";


configure({ adapter: new Adapter() });


it("should return date formated dd.mm.yyyy", () => {
  expect(normaliseDate("2013-12-28T00:00:00+00:00")).toBe("28.12.2013");
});

it("should return empty string if NULL is passed", () => {
  expect(normalizeCurrency("NULL")).toBe("");
});

describe("<Content /> with no props", () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  var wrapper = shallow(<Content data={[]}/>);

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  
  var table = wrapper.find('table');
  it("should have one table element", () => {
    expect(table).toHaveLength(1);
  });

  it("should have one table element", () => {
    var table = wrapper.find('table');
    const thead = table.find('thead');
    const th = thead.find('th');
    expect(th).toEqual({});
    expect(th).toHaveLength(8);
  });



});
