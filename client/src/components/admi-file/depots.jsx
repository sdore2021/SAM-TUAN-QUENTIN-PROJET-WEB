import React, { Component } from "react";
import axios from "axios";

class Depots extends Component {
  state = {
    depots: []
  };
  async componentDidMount() {
    axios.get("http://localhost:4000/gestions/getDepot").then(res => {
      const depots = res.data;
      this.setState({ depots });
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nom du dépôt</th>
            <th>Articles</th>
          </tr>
        </thead>
        <tbody>
          {this.state.depots.map(depot => (
            <tr>
              <td>{depot.nomDepot}</td>
              <td>{depot.articles.map( a => {
                <div>{a.articleIden} (x{a.quantiteOrdered}) - Rupture de stock: {a.oos}</div>
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Depots;
