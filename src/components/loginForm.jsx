import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  validate = () => {
    return { username: "Username is required" };
  };

  //Handles
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    console.log("formsubmit behaviour averted");
  };
  handleChange = e => {
    //clone the state's account
    const account = { ...this.state.account };
    //update clone with event's target (aka the input field) value
    account[e.currentTarget.name] = e.currentTarget.value;
    //safely overide with setState
    this.setState({ account: account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login In</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter your name"
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            type="password"
            placeholder="Enter your Password"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
