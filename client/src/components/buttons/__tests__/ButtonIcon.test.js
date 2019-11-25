import React from "react";
import { shallow } from "enzyme";
import ButtonIcon from "../ButtonIcon";

describe("ButtonIcon", () => {
  const mockHandleClick = jest.fn();

  const props = {
    handleClick: mockHandleClick,
    iconName: "icon"
  };

  it("renders icon", () => {
    const wrapper = shallow(<ButtonIcon {...props} />);

    expect(wrapper.find("i").props()).toEqual({
      className: "material-icons",
      children: props.iconName
    });
  });
});
