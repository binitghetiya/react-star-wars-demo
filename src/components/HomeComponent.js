import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Search from "./SearchComponent";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    if (!user.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return <Search />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
