import React from "react";
import { shallow } from "enzyme";
import Progress from "../Progress";

describe("Progress", () => {
  const props = {
    value: 50
  };

  it("renders value", () => {
    const wrapper = shallow(<Progress {...props} />);

    expect(wrapper.find(".progress").props()).toEqual({
      children: props.value
    });
  });
});
