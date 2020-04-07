import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Cart from "./components/Cart";

import LoginForm from "./components/commum/loginForm";
import RegisterUser from "./components/commum/registerUser";
import LogoutAdmin from "./components/commum/logout";

import AdminHome from "./components/admi-file/adminHome";
import Articles from "./components/admi-file/articles";
import Commandes from "./components/admi-file/commandes";
import Clients from "./components/admi-file/clients";
import Depots from "./components/admi-file/depots";
import Factures from "./components/admi-file/factures";
import Livraisons from "./components/admi-file/livraisons";
import Users from "./components/admi-file/users";
import RefusePage from "./components/admi-file/refusePage";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      const isAdmin = user.isAdmin;
      this.setState({ user, isAdmin });
    } catch (ex) {}
  }

  render() {
    const { user: USER, isAdmin: ISADMIN } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={USER} isAdmin={ISADMIN} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/LoginAdmin" component={LoginForm} />
            <Route path="/LogoutAdmin" component={LogoutAdmin} />
            <Route path="/AdminHome" component={AdminHome} />
            <Route path="/CreateNewAdmin" component={RegisterUser} />
            <Route path="/Article" component={Articles} />
            <Route path="/Commande" component={Commandes} />
            <Route path="/Client" component={Clients} />
            <Route path="/Depot" component={Depots} />
            <Route path="/Facture" component={Factures} />
            <Route path="/Livraison" component={Livraisons} />
            <Route path="/Users" component={Users} />
            <Route path="/RefusePage" component={RefusePage} />
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
