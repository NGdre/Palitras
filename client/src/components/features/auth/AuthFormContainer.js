import React, { Component, Fragment } from "react";
import AuthForm from "./AuthForm";
import { connect } from "react-redux";
import { selectDataFetcher } from "../../actions/auth";
import { setAuthorization } from "../../actions/auth";
import PropTypes from "prop-types";

export class AuthFormContainer extends Component {
  render() {
    return (
      <Fragment>
        <AuthForm {...this.props} />
      </Fragment>
    );
  }
}

AuthFormContainer.propTypes = {
  type: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    shouldAnimate: state.auth.shouldAnimate,
    message: state.auth.message
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendDataToServer: data => dispatch(selectDataFetcher(ownProps.type, data)),
    setAuthorization: () => dispatch(setAuthorization(true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthFormContainer);
