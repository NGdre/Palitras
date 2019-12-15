import React from "react";
import { shallow } from "enzyme";
import Form from "../Form";

describe("Form", () => {
  let props: {
    onSubmit: jest.Mock<any, any>;
  };

  beforeEach(() => {
    const mockOnSubmit = jest.fn();

    props = {
      onSubmit: mockOnSubmit
    };
  });

  it('should submit on key "enter" ', () => {
    const wrapper = shallow(<Form {...props}></Form>);

    wrapper.find("form").simulate("keydown", { key: "Enter" });

    expect(props.onSubmit.mock.calls).toHaveLength(1);
  });

  it("should render children", () => {
    const wrapper = shallow(
      <Form {...props}>
        <input>Some input</input>
      </Form>
    );

    expect(wrapper.find("input")).toHaveLength(1);
  });
});
