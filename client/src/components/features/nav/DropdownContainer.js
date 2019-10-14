import React from "react";
import { connect } from "react-redux";
import { removeToken } from "../../actions/auth";
import Dropdown from "./Dropdown";

function DropdownContainer(props) {
  return <Dropdown logout={props.logout} />;
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => removeToken(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DropdownContainer);
