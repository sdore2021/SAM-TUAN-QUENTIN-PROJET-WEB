import React, { Component } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { auth } from "./auth";
import { Button, Modal } from "react-bootstrap";

class AddArticle extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    article: { title: "", price: "", depot: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    price: Joi.number()
      .required()
      .label("Price"),
    depot: Joi.string()
      .required()
      .label("Depot")
  };

  handleChange = ({ currentTarget: input }) => {
    const article = { ...this.state.article };
    article[input.name] = input.value;
    this.setState({ article });
  };

  validate() {
    const result = Joi.validate(this.state.article, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call the server ici a
    const { title, price, depot } = this.state.article;
    console.log(this.state.article);
    await axios
      .post("http://localhost:4000/gestions/createArticle", {
        title,
        price,
        depot
      })
      .then(res => {
        console.log("article was created");
      })
      .catch(ex => {
        console.log(ex);
      });
  };

  componentDidMount() {
    auth();
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a new article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" sm="2">
                  Title
                </label>
                <input
                  value={this.state.article.title}
                  onChange={this.handleChange}
                  name="title"
                  id="title"
                  type="text"
                  className="form-control"
                />
                {this.state.errors.title && (
                  <div className="alert alert-danger">
                    {this.state.errors.title}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  value={this.state.article.price}
                  onChange={this.handleChange}
                  name="price"
                  id="price"
                  type="text"
                  className="form-control"
                />
                {this.state.errors.price && (
                  <div className="alert alert-danger">
                    {this.state.errors.price}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="depot">Depot</label>
                <input
                  value={this.state.article.depot}
                  onChange={this.handleChange}
                  name="depot"
                  id="depot"
                  type="text"
                  className="form-control"
                />
                {this.state.errors.depot && (
                  <div className="alert alert-danger">
                    {this.state.errors.depot}
                  </div>
                )}
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary">Submit</button>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddArticle;
