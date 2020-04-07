import React, { Component } from "react";
import axios from "axios";
import { auth } from "./auth";

class Users extends Component {
  state = {
    users: [],
  };
  async componentDidMount() {
    auth();

    axios.get("http://localhost:4000/gestions/getUsers").then((res) => {
      const users = res.data;
      this.setState({ users });
    });
  }

  handleDelete(user) {
    var url = "http://localhost:4000/gestions/deleteUser/" + user._id;
    console.log(url);
    axios.delete(url).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    window.location.reload(false);
  }

  handleIsAdmin(isAdmin) {
    if (isAdmin) return "True";
    return "False";
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID User</th>
            <th>Username</th>
            <th>Name</th>
            <th>Password</th>
            <th>IsAdmin</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.password}</td>
              <td>{this.handleIsAdmin(user.isAdmin)}</td>
              <th>
                <button
                  onClick={() => this.handleDelete(user)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Users;
