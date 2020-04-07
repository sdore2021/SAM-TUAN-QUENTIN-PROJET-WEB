import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import jwtDecode from "jwt-decode";

import {
  addQuantity,
  subtractQuantity,
  removeItem,
} from "../actions/cartActions";

class Cart extends Component {
  //to add the quantity
  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  };
  //to substruct from the quantity
  handleSubtractQuantity = (id) => {
    this.props.subtractQuantity(id);
  };
  //to remove the item
  handleRemove = (id) => {
    this.props.removeItem(id);
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      if (!user) window.location = "/LoginAdmin";
    } catch (error) {
      window.location = "/LoginAdmin";
    }
  }

  render() {
    let addedItemsArray = this.props.items;

    let handleToken = async (token, addresses) => {
      var ID_client = "";
      try {
        const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt);
        if (user) {
          ID_client = user._id;
          // console.log("clientID => " + ID_client);
        } else {
          console.log("please login first");
          window.location = "/LoginAdmin";
        }
      } catch (ex) {
        console.log("please login first");
        window.location = "/LoginAdmin";
      }

      // le premier un post et les autres sont put.
      let nb_commande = addedItemsArray.length;
      const commande = {
        _id_client: ID_client,
        articles: {
          articleId: "5e7f8ec1040a3133609f1abd", //addedItemsArray[0].id
          quantiteOrdered: addedItemsArray[0].quantity,
        },
      };
      await axios
        .post("http://localhost:4000/gestions/createCommande", commande)
        .then((res) => {
          console.log("article was created");
          console.log(res);
          console.log(nb_commande);
          const url =
            "http://localhost:4000/gestions/ArticleAddCommand/" + res.data._id;
          //console.log(url);
          for (let pas = 1; pas < nb_commande; pas++) {
            axios
              .put(url, {
                articles: {
                  articleId: "5e537f0f0853551e308ccec1", //addedItemsArray[pas].id
                  quantiteOrdered: addedItemsArray[pas].quantity,
                },
              })
              .then((res) => {
                console.log(res);
              })
              .catch((ex) => {
                console.log(ex);
              });
          }
        })
        .catch((ex) => {
          console.log(ex);
        });

      console.log("send to server here");
      window.location = "/";
      return null;
      //console.log(response);
    };

    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.img} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>{item.desc}</p>
              <p>
                <b>Price: {item.price}$</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleAddQuantity(item.id);
                    }}
                  >
                    add_circle
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleSubtractQuantity(item.id);
                    }}
                  >
                    remove_circle
                  </i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  this.handleRemove(item.id);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p>
        There is nothing in your cart. Please come back to home page to buy some
        tours of trip
      </p>
    );
    return (
      <div className="container">
        <div className="cart">
          {this.props.items.length !== 0 ? <h5>You have ordered:</h5> : null}

          <ul className="collection">{addedItems}</ul>
        </div>
        {/* Show or hide when have item or not */}
        {this.props.items.length !== 0 ? (
          <div className="container">
            <div className="collection">
              <li className="collection-item">
                <b>Total: {this.props.total} $</b>
              </li>
            </div>
            <StripeCheckout
              stripeKey="pk_test_3J0jFuiHv35qBJiibYQJaAFw006XOW1eIR"
              token={handleToken}
              shippingAddress
              billingAddress
              amount={this.props.total * 100}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id) => {
      dispatch(subtractQuantity(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
