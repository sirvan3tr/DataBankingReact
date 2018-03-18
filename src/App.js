import React, { Component } from 'react'

// Blockchain Specifics
// Contracts and JSONRPC Library
import omneePortalContract from '../build/contracts/omneePortal.json'
import omneeIDContract from '../build/contracts/omneeID.json'
import getWeb3 from './utils/getWeb3'

// Router
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter
} from "react-router-dom";

// Import webpages & custom libraries
import Contact from "./components/Contact";
import About from "./components/About";
import Register from "./Register";
import Home from "./Home";
// Responsible for user login
import userInitialisation from './userInitialisation';

// Utilities
import './App.css'

import './css/oswald.css'
import './css/open-sans.css'
//import './css/pure-min.css'
import './css/bootstrap.css'

import 'bootstrap/dist/css/bootstrap.min.css';



class App extends userInitialisation {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 45,
      account: 0,
      acc: 0,
      web3: null,
      registered: false,
      name: 'n/a',
      surname: 'n/a',
      email: 'n/a',
      owner: 'n/a',
      formName: '',
      formSurname: '',
      formEmail: ''
    };
  }



  userHeader() {
    if (this.userDetails.registered == false) {
      return (
        <div className="fr">
          <Link to="/login" className="pure-menu-heading pure-menu-link fr">Log In</Link>
          <Link to="/Register" className="pure-menu-heading pure-menu-link fr">Register</Link>
        </div>
      );
    }else {
      return(
        <div className="fr">
          Welcome, {this.userDetails.name}
        </div>
      );
    }
  }

  render() {
    const userHeaderLogic = this.userHeader();
    
    return (
      <Router>
      <div className="Container">
        <nav className="navbar pure-menu pure-menu-horizontal">
        <a href="/Home" className="pure-menu-heading pure-menu-link">
          <img className="header-logo" src={require('./imgs/omnee_logo_white.png')} width="80"/>
        </a>

        <Link to="/active" className="pure-menu-heading pure-menu-link">Solutions</Link>
        <Link to="/About" className="pure-menu-heading pure-menu-link">About</Link>
        <Link to="/Contact" className="pure-menu-heading pure-menu-link">Contact</Link>

        {userHeaderLogic}
        </nav>
        <div className="row justify-content-md-center">
        <div className="col col-md-8">
        {this.userDetails.name}ddd
        <Route
          path='/Contact'
          render={(props) => <Contact {...props} name={this.userDetails.name} />}
        />

        <Route path="/About" component={About} />

        <Route
          path='/Register'
          render={(props) => <Register {...props} />}
        />

        <Route
          path='/Home'
          render={(props) => <Home {...props} />}
        />
        
        <h5>{this.userDetails.email}</h5>
          <div className="columnside">
              <h3>Welcome, {this.userDetails.name} {this.userDetails.surname}</h3>
              Your Ethereum address: <br />
              <p className="address">{this.userDetails.accountAddress}</p>

              Your omneeID address: <br />
              <p className="address">{this.userDetails.omneeIDAddress}</p>
          </div>
          </div>
          </div>
          </div>
          

      </Router>
    );
  }
}

export default App ;
