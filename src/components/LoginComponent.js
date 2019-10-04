import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Button,
  Alert
} from "reactstrap";
import { loginUser } from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { verifyLoginRequest } from "./../redux/Apis";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      login: false,
      submitting: false
    };
  }

  componentDidMount() {}

  handleSwChange = e => {
    e.preventDefault();
    var swName = e.target.name;
    this.setState({
      [swName]: e.target.value
    });
  };

  validateForm = () => {
    if (!this.state.username) {
      this.setState({ errorMessage: "Please enter username" });
      return false;
    }
    if (!this.state.password) {
      this.setState({ errorMessage: "Please enter password" });
      return false;
    }
    return true;
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({ errorMessage: "", submitting: true });
      try {
        const res = await verifyLoginRequest(this.state.username);
        if (res) {
          if (res.birth_year === this.state.password) {
            delete res.birth_year;
            this.props.actions.loginUser(true, res);
          } else {
            this.setState({
              errorMessage: "Password is incorrect",
              submitting: false
            });
          }
        } else {
          this.setState({
            errorMessage: "Invalid Login details",
            submitting: false
          });
        }
      } catch (error) {
        this.setState({
          errorMessage: "Something went wrong with API",
          submitting: false
        });
      }
    }
  };

  render() {
    const { user } = this.props;
    if (user.isLoggedIn) {
      return <Redirect to="/" />;
    }
    const { errorMessage, submitting } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h2>Sign In</h2>
              {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : ""}

              <Form className="form" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>Username</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleSwChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    onChange={this.handleSwChange}
                    placeholder="********"
                  />
                </FormGroup>
                <Button>{submitting ? "Submitting.." : "Submit"}</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loginUser }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
