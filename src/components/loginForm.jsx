import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };
  //Handles
  handleSubmit = e => {
    e.preventDefault();
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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={account.username}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              name="password"
              value={account.password}
              onChange={this.handleChange}
              type="password"
              className="form-control"
              id="Password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
