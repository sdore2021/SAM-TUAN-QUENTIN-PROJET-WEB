import React, { Component } from "react";
import axios from "axios";
import { auth } from "./auth";

class Commandes extends Component {
  state = {
    commandes: [],
  };
  async componentDidMount() {
    auth();

    axios.get("http://localhost:4000/gestions/getCommande").then((res) => {
      const commandes = res.data;
      this.setState({ commandes });
    });
  }

  totalCost(commande) {
    /* A FINIR */
    let sum = 0;
    return sum;
  }

  handleDelete(commande) {
    var url = "http://localhost:4000/gestions/deleteCommande/" + commande._id;
    console.log(url);
    axios.delete(url).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    window.location.reload(false);
  }

  render() {
    console.log(this.state.commandes);
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Date commande</th>
            <th>ID du client</th>
            <th>Nb Articles</th>
            <th>Coût total</th>
          </tr>
        </thead>
        <tbody>
          {this.state.commandes.map((commande) => (
            <tr key={commande._id}>
              <td>{commande._id}</td>
              <td>{commande.date_commande}</td>
              <td>{commande.clientId}</td>
              <td>{commande.articles.length}</td>
              <td>{this.totalCost(commande)}</td>
              <th>
                <button
                  onClick={() => this.handleDelete(commande)}
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

export default Commandes;
