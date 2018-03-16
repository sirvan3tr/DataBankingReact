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
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Define all user detials
  setUser(_name, _surname, _em, _nhsN, _omIDAd) {
    this.userDetails.name = _name
    this.userDetails.surname = _surname;
    this.userDetails.email = _em;
    this.userDetails.nhsNumber = _nhsN;
    this.userDetails.omneeIDAddress = _omIDAd;
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.formName);
    event.preventDefault();

    const contract = require('truffle-contract') ;

    const omneePortal = contract(omneePortalContract) ;
    const omneeID = contract(omneeIDContract) ;
    
    omneePortal.setProvider(this.state.web3.currentProvider) ;
    omneeID.setProvider(this.state.web3.currentProvider) ;

    var omneePortalInstance, omneeIDInstance

    this.state.web3.eth.getAccounts((error, accounts) => {
      omneePortal.deployed().then((instance) => {
        omneePortalInstance = instance ;
        return omneePortalInstance.createID.sendTransaction(
          1, 'Sirvan', 'Almasi', 'email', '9876544321', {from: accounts[0]})
      }).then((result) => {
        console.log(result)
      })
    })
  }

  handleChange(event) {
    this.setState({formEmail: event.target.value});
    console.log(event.target.varst)
  }

  render() {
    var ff = "null";
    console.log(this.userDetails)
    if (this.userDetails.registered == true) {
      ff = "Wow its true";
    } else {
      ff = "wow its false";
    }
    
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
        <Link to="/Register" className="pure-menu-heading pure-menu-link fr">Log In</Link>
        <Link to="/Register" className="pure-menu-heading pure-menu-link fr">Register</Link>

        </nav>
        <div className="row justify-content-md-center">
        <div className="col col-md-8">

        <Route
          path='/Contact'
          render={(props) => <Contact {...props} name={this.userDetails.name} />}
        />

        <Route path="/About" component={About} />
        <Route path="/Register" component={Register} />
        <Route path="/Home" component={Home} />
        
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
