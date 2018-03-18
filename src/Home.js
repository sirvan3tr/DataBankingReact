import React, { Component } from 'react'

// Blockchain Specifics
// Contracts and JSONRPC Library
import omneePortalContract from '../build/contracts/omneePortal.json'
import omneeIDContract from '../build/contracts/omneeID.json'
import omneeRegistryContract from '../build/contracts/omneeRegistry.json'

import getWeb3 from './utils/getWeb3'

// Router
import {
    BrowserRouter as Router,
} from "react-router-dom";


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import userInitialisation from './userInitialisation';

class Home extends userInitialisation {

  constructor(props) {
    super(props);
    //console.log(this.state.web3);
    //this.getLinks();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLinks() {
    const contract = require('truffle-contract') ;

    // Get the contracts
    //const omneePortal = contract(omneePortalContract) ;
    //const omneeID = contract(omneeIDContract) ;
    const omneeRegistry = contract(omneeRegistryContract);

    //omneePortal.setProvider(this.web3.currentProvider);
    
    //omneeRegistry.setProvider(this.web3.currentProvider);
    // Declaring this for later so we can chain functions
    var omneeRegistryInstance ;

    // Get accounts.
    this.web3.eth.getAccounts((error, accounts) => {
      omneeRegistry.deployed().then((instance) => {
        omneeRegistryInstance = instance;
        return omneeRegistryInstance.getLink.call(this.userDetails.omneeIDAddress, {from: accounts[0]})
      }).then((result) => {
        console.log("reg-->" + result);
      })
    })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.userDetails.name);
    event.preventDefault();

    const contract = require('truffle-contract') ;

    const omneeRegistry = contract(omneeRegistryContract);
    omneeRegistry.setProvider(this.web3.currentProvider) ;
    var omneeRegistryInstance ;

    this.web3.eth.getAccounts((error, accounts) => {
      omneeRegistry.deployed().then((instance) => {
        omneeRegistryInstance = instance;
        return omneeRegistryInstance.getALink.call(this.userDetails.omneeIDAddress, 6, {from: accounts[0]})
      }).then((result) => {
        console.log("reg-->" + result);
      })
    })
  }

  render() {
    
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    );
  }
}

export default Home;