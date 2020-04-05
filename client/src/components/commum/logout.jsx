import React, { Component } from "react";
class LogoutAdmin extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default LogoutAdmin;
