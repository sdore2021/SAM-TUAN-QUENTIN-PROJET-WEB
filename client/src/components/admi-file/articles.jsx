import React, { Component } from "react";
import axios from "axios";
import { auth } from "./auth";
import AddArticle from "./AddArticle";

class Articles extends Component {
  state = {
    articles: [],
    addModalShow: false
  };
  async componentDidMount() {
    auth();

    axios.get("http://localhost:4000/gestions/getArticle").then(res => {
      const articles = res.data;
      this.setState({ articles });
    });
  }

  handleDelete(article) {
    var url = "http://localhost:4000/gestions/deleteArticle/" + article._id;
    console.log(url);
    axios.delete(url).then(res => {
      console.log(res);
      console.log(res.data);
    });

    window.location.reload(false);
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID_Article</th>
              <th>Title</th>
              <th>Price</th>
              <th>ID_Depot</th>
              <th>
                <button
                  onClick={() => this.setState({ addModalShow: true })}
                  className="btn btn-primary btn-sm"
                >
                  Ajoute
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.articles.map(article => (
              <tr key={article._id}>
                <th>{article._id}</th>
                <th>{article.title}</th>
                <th>{article.price}</th>
                <th>{article.depot}</th>
                <th>
                  <button
                    onClick={() => this.handleDelete(article)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <AddArticle show={this.state.addModalShow} onHide={addModalClose} />
      </div>
    );
  }
}

export default Articles;
