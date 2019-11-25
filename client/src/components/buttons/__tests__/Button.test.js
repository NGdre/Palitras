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
      children: ["some name", false]
    });
  });

  it("if it has prop 'tolltip', then renders tolltips", () => {
    const wrapper = shallow(
      <Button {...props} tooltips="tooltip">
        some name
      </Button>
    );

    expect(wrapper.find(".tooltips")).toHaveLength(1);

    expect(wrapper.find(".tooltips").props()).toEqual({
      className: "tooltips",
      children: "tooltip"
    });
  });

  it("should has property className, if provide class", () => {
    const wrapper = shallow(
      <Button {...props} className="class">
        some name
      </Button>
    );

    expect(wrapper.find("button").hasClass("class")).toBeTruthy();
  });

  it("should throw error, if it has not required property", () => {
    // const wrapper = shallow(<Button />);
    // console.log(wrapper);
    // expect(wrapper);
  });
});
