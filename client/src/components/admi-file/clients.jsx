import React, { Component } from "react";
import axios from "axios";
class Clients extends Component {
  state = {
    clients: []
  };
  async componentDidMount() {
    axios.get("http://localhost:4000/gestions/getClient").then(res => {
      const clients = res.data;
      this.setState({ clients });
    });
    console.log(this.state.clients);
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nom du client</th>
            <th>Taux de Remise</th>
            <th>Commandes passées</th>
          </tr>
        </thead>
        <tbody>
          {this.state.clients.map(client => (
            <tr>
              <td>{client.nom_client}</td>
              <td>{client.taux_remise}</td>
              <td>{client.commande.map( c => {
                <div>{c.articles.map( a => {
                  <div>{a.articleId} (x{a.quantiteOrdered})</div>
                })}</div>
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Clients;
