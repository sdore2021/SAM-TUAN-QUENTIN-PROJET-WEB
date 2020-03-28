import React, { Component } from "react";
import axios from "axios";

class Factures extends Component {
  state = {
    factures: []
  };
  async componentDidMount() {
    axios.get("http://localhost:4000/gestions/getDepot").then(res => {
      const factures = res.data;
      this.setState({ factures });
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date de commande</th>
            <th>Livraison</th>
          </tr>
        </thead>
        <tbody>
          {this.state.factures.map(facture => (
            <tr>
              <td>{facture.date_commande}</td>
              <td>{facture.livraison}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Factures;
