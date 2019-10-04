import React, { Component } from "react";
import { logoutUser } from "./../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }

  logout = () => {
    this.props.actions.logoutUser();
    window.location.href = "#/login";
  };

  render() {
    const { user } = this.props;
    const site = `Star Wars Demo${
      user && user.user ? " ( " + user.user.name + " )" : ""
    }`;
    return (
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light menu">
          <div className="navbar-nav col-md-11">
            <a className="nav-item nav-link active " href={"/"}>
              {site}
              <span className="sr-only">(current)</span>
            </a>
          </div>
          {user.isLoggedIn ? (
            <button className="btn btn-success col-md-1" onClick={this.logout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logoutUser }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
