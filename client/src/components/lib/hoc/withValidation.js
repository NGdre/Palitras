import React from "react";
import ErrInput from "../inputs/ErrForInput";
import PropTypes from "prop-types";

export default function withValidation(Component, validator) {
  class withValidate extends React.Component {
    state = {
      inputValue: "",
      isValid: false,
      errStatus: null
    };

    componentDidUpdate(prevProps, prevState) {
      const { inputValue, isValid } = this.state;

      if (prevState.inputValue !== inputValue) {
        this.giveValueToParent(inputValue, isValid);
      }

      if (prevProps.showError !== this.props.showError) {
        this.showError();
      }
    }

    giveValueToParent(value, isValid) {
      this.props.onChangeField({
        type: this.props.fieldToValidate,
        value,
        isValid
      });
    }

    showError() {
      const errStatus = this.props.showError ? this.props.errMessage : null;

      this.setState({ errStatus });
    }

    handleChange = value => {
      const isValid = validator(value);

      this.setState({ inputValue: value, isValid });
    };

    render() {
      return (
        <Component
          {...this.props}
          onChange={this.handleChange}
          renderMessage={() =>
            this.state.errStatus && (
              <ErrInput
                type={this.props.fieldToValidate}
                text={this.props.errMessage}
              />
            )
          }
        />
      );
    }
  }

  withValidate.propTypes = {
    fieldToValidate: PropTypes.string.isRequired,
    errMessage: PropTypes.string.isRequired,
    showError: PropTypes.bool.isRequired,
    onChangeField: PropTypes.func.isRequired
  };

  return withValidate;
}
