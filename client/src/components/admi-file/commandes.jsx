import React, { Component } from "react";
import axios from "axios";

class Commandes extends Component {
  state = {
    commandes: []
  };
  async componentDidMount() {
    axios.get("http://localhost:4000/gestions/getCommande").then(res => {
      const commandes = res.data;
      this.setState({ commandes });
    });
  }

  totalCost(commande) {
    /* A FINIR */
    let sum=0;
    return sum;
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date commande</th>
            <th>ID du client</th>
            <th>Articles</th>
            <th>Coût total</th>
          </tr>
        </thead>
        <tbody>
          {this.state.commandes.map(commande => (
            <tr>
              <td>{commande.date_commande}</td>
              <td>{commande.clientId}</td>
              <td>{commande.articles.map( a => {
                <div>{a.title} (x{a.quantiteOrdered})</div>
              })}</td>
              <td>{this.totalCost(commande)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Commandes;
