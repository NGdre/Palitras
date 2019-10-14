import React, { Component } from "react";
import { EmailInput, PasswordInput, SubmitInput } from "../../lib";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import AnimatedBG from "./AnimatedBG";

class AuthForm extends Component {
  state = {
    email: {
      value: "",
      isValid: false
    },
    password: {
      value: "",
      isValid: false
    },
    showErrors: false
  };

  isFieldsEmpty = () => {
    const { email, password } = this.state;
    return !(email.value && password.value);
  };

  isFieldsValid = () => {
    const { email, password } = this.state;
    return email.isValid && password.isValid;
  };

  handleInputValue = field => {
    this.setState(state => {
      const { value, isValid } = field;

      return {
        [field.type]: Object.assign(state[field.type], { value, isValid })
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFieldsValid()) {
      this.setState({ showErrors: false });
      const { email, password } = this.state;

      const data = {
        email: email.value,
        password: password.value
      };

      this.props.sendDataToServer(data);
    } else {
      this.setState({ showErrors: true });
    }
  };

  render() {
    const isFieldsEmpty = this.isFieldsEmpty();
    const { email, password, showErrors } = this.state;

    const emailErrStatus = !email.isValid && showErrors;
    const passwordErrStatus = !password.isValid && showErrors;

    return (
      <>
        {this.props.isLogged && <Redirect to="/" />}
        <AnimatedBG
          shouldAnimate={this.props.shouldAnimate}
          onAnimationEnd={this.props.setAuthorization}
        />
        <form onSubmit={this.handleSubmit}>
          <EmailInput
            onChangeField={this.handleInputValue}
            showError={emailErrStatus}
            fieldToValidate="email"
            autoFocus={true}
            errMessage="email is invalid"
          />
          <PasswordInput
            onChangeField={this.handleInputValue}
            showError={passwordErrStatus}
            fieldToValidate="password"
            errMessage="password is invalid"
          />
          <SubmitInput title={this.props.title} disabled={isFieldsEmpty} />
          {this.props.message && <p className="err">{this.props.message}</p>}
        </form>
      </>
    );
  }
}

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  sendDataToServer: PropTypes.func.isRequired
};

export default AuthForm;
