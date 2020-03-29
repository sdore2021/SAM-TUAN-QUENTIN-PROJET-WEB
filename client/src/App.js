import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import LoginForm from "./components/admi-file/loginForm";
import AdminHome from "./components/admi-file/adminHome";
import RegisterAdim from "./components/admi-file/registerAdmin";
import LogoutAdmin from "./components/admi-file/logoutAdmin";
import CardA from "./components/admi-file/cards";

import Articles from "./components/admi-file/articles";
import Commandes from "./components/admi-file/commandes";
import Clients from "./components/admi-file/clients";
import Depots from "./components/admi-file/depots";
import Factures from "./components/admi-file/factures";
import Livraisons from "./components/admi-file/livraisons";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user: USER } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={USER} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/LoginAdmin" component={LoginForm} />
            <Route path="/LogoutAdmin" component={LogoutAdmin} />
            <Route path="/AdminHome" component={AdminHome} />
            <Route path="/CreateNewAdmin" component={RegisterAdim} />
            <Route path="/Article" component={Articles} />
            <Route path="/Commande" component={Commandes} />
            <Route path="/Client" component={Clients} />
            <Route path="/Depot" component={Depots} />
            <Route path="/Facture" component={Factures} />
            <Route path="/Livraison" component={Livraisons} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

/**
 * 
 * <Route path="/AdminHome" component={AdminHome} />
 * <Route
              path="/AdminHome"
              render={props => {
                if (user) return <Redirect to="/LoginAdmin" />;
                return <AdminHome {...props} />;
              }}
            />
            <Route
              path="/CreateNewAdmin"
              render={props => {
                if (!this.state.user) return <Redirect to="/LoginAdmin" />;
                return <RegisterAdim {...props} />;
              }}
            />
 */
