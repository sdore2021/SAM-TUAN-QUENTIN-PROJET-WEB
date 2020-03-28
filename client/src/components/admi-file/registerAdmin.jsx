import React, { Component } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { auth } from "./auth";
class RegisterAdim extends Component {
  state = {
    account: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .min(5)
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .min(5)
      .label("name")
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  validate() {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call the server
    const { username: email, password, name } = this.state.account;
    console.log(this.state.account);
    await axios
      .post("http://localhost:4000/gestions/createUserAdm", {
        name,
        email,
        password
      })
      .then(res => {
        console.log("create new admin succesful");
        this.props.history.push("/AdminHome"); // permet de naviguer
      })
      .catch(ex => {
        if (ex.response && ex.response.status === 400) {
          this.setState({
            errors: { username: ex.response.data }
          });
        }
        console.log(ex.response);
      });
  };

  componentDidMount() {
    auth();
  }

  render() {
    return (
      <main className="container">
        <div>
          <h1>Register new Admin</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                value={this.state.account.username}
                onChange={this.handleChange}
                name="username"
                id="username"
                type="text"
                className="form-control"
              />
              {this.state.errors.username && (
                <div className="alert alert-danger">
                  {this.state.errors.username}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                value={this.state.account.name}
                onChange={this.handleChange}
                name="name"
                id="name"
                type="text"
                className="form-control"
              />
              {this.state.errors.name && (
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={this.state.account.password}
                onChange={this.handleChange}
                name="password"
                id="password"
                type="password"
                className="form-control"
              />
              {this.state.errors.password && (
                <div className="alert alert-danger">
                  {this.state.errors.password}
                </div>
              )}
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </main>
    );
  }
}

export default RegisterAdim;
