import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {
  addQuantity,
  subtractQuantity,
  removeItem
} from "../actions/cartActions";

class Cart extends Component {
  //to add the quantity
  handleAddQuantity = id => {
    this.props.addQuantity(id);
  };
  //to substruct from the quantity
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };
  //to remove the item
  handleRemove = id => {
    this.props.removeItem(id);
  };

  render() {
    let addedItemsArray = this.props.items;

    let handleToken = async (token, addresses) => {
      // Send a request to server url: http://127.0.0.1:3002/users/checkout
      const response = await axios.post(
        "http://127.0.0.1:3002/users/checkout",
        {
          token,
          addedItemsArray
        }
      );
      console.log(response);
    };

    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
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

const mapStateToProps = state => {
  return {
    items: state.addedItems,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
