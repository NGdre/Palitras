import React from "react";
import { shallow } from "enzyme";
import Button from "../Button.js";

describe("Button", () => {
  const mockHandleClick = jest.fn();

  const props = {
    handleClick: mockHandleClick
  };

  it("if button is disabled, className gets class 'disabled'", () => {
    const wrapper = shallow(
      <Button {...props} disabled={true}>
        some name
      </Button>
    );

    expect(wrapper.find("button").hasClass("disabled")).toBeTruthy();
  });

  it("button initial props", () => {
    const wrapper = shallow(<Button {...props}>some name</Button>);

    expect(wrapper.find("button").props()).toEqual({
      onClick: props.handleClick,
      type: "button",
      disabled: false,
      className: "btn",
      children: "some name"
    });
  });
});
