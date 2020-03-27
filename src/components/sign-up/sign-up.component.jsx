import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions.js";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();
  
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    //draw sign-up info from this.state
    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpStart } = this.props;

    //stop execution of passwords do not match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    signUpStart({displayName, email, password});
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h1 className="title">I do not have an account</h1>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="DisplayName"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />

          <CustomButton type="Sumbit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userData) => dispatch(signUpStart(userData))
})

export default connect(null,mapDispatchToProps)(SignUp);
