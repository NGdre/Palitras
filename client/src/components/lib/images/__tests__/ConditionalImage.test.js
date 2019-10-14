import React from "react";
import { shallow } from "enzyme";
import ConditionalImage, { defaultClassName } from "../ConditionalImage";

describe("ConditionalImage", () => {
  const props = {
    src: "/someurl"
  };

  it("if there's not src prop, img does not render", () => {
    const wrapper = shallow(<ConditionalImage />);

    expect(wrapper.find("img")).toHaveLength(0);
  });

  it("if there's src prop, img renders", () => {
    const wrapper = shallow(<ConditionalImage {...props} />);

    expect(wrapper.find("img")).toHaveLength(1);
  });

  it("if there's prop 'className', img should have new class", () => {
    const wrapper = shallow(
      <ConditionalImage {...props} className="new-img" />
    );

    expect(wrapper.find("img").hasClass("new-img")).toBeTruthy();
  });

  it("if there's not prop 'className', img should have default value", () => {
    const wrapper = shallow(<ConditionalImage {...props} />);

    expect(wrapper.find("img").hasClass(defaultClassName)).toBeTruthy();
  });
});
