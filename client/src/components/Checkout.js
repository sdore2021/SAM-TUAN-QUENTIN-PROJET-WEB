import React, { Component } from "react";
import { connect } from "react-redux";

class Checkout extends Component {
  render() {
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <b>Total: {this.props.total} $</b>
          </li>
        </div>
        <div className="checkout">
          <button className="waves-effect waves-light btn">Checkout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    total: state.total
  };
};

export default connect(mapStateToProps)(Checkout);
