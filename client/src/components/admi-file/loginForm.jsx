import React, { Component } from "react";
import axios from "axios";
import Joi from "joi-browser";

//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
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

  login = (email, password) => {
    axios.post("http://localhost:4000/gestions/auth", {
      email,
      password
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call the server
    const { username: email, password } = this.state.account;
    //await this.login(account.username, account.password);
    await axios
      .post("http://localhost:4000/gestions/auth", {
        email,
        password
      })
      .then(res => {
        console.log("authentification reussi");
        // all browsers have this database name localStorage
        const jwt = res.data;
        localStorage.setItem("token", jwt);
        //this.props.history.push("/AdminHome"); // permet de naviguer
        window.location = "/AdminHome";
      })
      .catch(ex => {
        if (ex.response && ex.response.status === 400) {
          this.setState({
            errors: { username: ex.response.data }
          });
        }
      });
  };

  /*async componentDidMount() {
    // adminsteur par defaut ajouter automatiquement sans le postman
    // c'est pour facilité le test que j'ai ajouter adminstrateur par defaut
    // mais normalement non
    await axios
      .post("http://localhost:4000/gestions/createUserAdm", {
        name: "samouka",
        email: "samouka.dore@insa-cvl.fr",
        password: "azerty"
      })
      .then(res => {
        console.log("create default admin is succesful");
      })
      .catch({});
  }*/

  render() {
    return (
      <main className="container">
        <div>
          <h1>Login</h1>
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
            <button disabled={this.validate()} className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }
}

export default LoginForm;
