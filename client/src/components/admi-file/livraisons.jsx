import React, { Component } from "react";
import axios from "axios";

class Livraisons extends Component {
  state = {
    livraisons: []
  };
  async componentDidMount() {
    axios.get("http://localhost:4000/gestions/getDepot").then(res => {
      const livraisons = res.data;
      this.setState({ livraisons });
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
          {this.state.livraisons.map(livraison => (
            <tr>
              <td>{livraison.client}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Livraisons;
