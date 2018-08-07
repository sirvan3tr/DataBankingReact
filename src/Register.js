import React, { Component } from 'react'

// Blockchain Specifics
// Contracts and JSONRPC Library
import omneePortalContract from '../build/contracts/omneePortal.json'
import omneeIDContract from '../build/contracts/omneeID.json'
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

class userRegistration extends userInitialisation {
  constructor(props) {
      super(props);

      this.state = {
        'firstname': '',
        'surname': '',
        'email': '',
        'nhsnumber': '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.firstname);
    event.preventDefault();

    const contract = require('truffle-contract') ;

    const omneePortal = contract(omneePortalContract) ;
    const omneeID = contract(omneeIDContract) ;
    
    omneePortal.setProvider(this.web3.currentProvider) ;
    omneeID.setProvider(this.web3.currentProvider) ;

    var omneePortalInstance, omneeIDInstance;

    this.web3.eth.getAccounts((error, accounts) => {
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
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  registerForm() {
      return (
        <div className="row my-3 p-3 bg-white rounded box-shadow justify-content-md-center">
          <div className="col-md-6">
            <h3>Welcome,</h3>
            <p>The thing is... you can't have your personal information on the Blockchain! You need our cool mobile phone app. You can register now and using the same public-private key pair login on your phone and initiatilise your details from there? Too much..? well we can also host your data for you if you want?</p>
            Your Ethereum address: <br />
            <p className="address">{this.userDetails.accountAddress}</p>

            Use the form below if you wish to sign up and we store your data for you.
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>First name</label>
                <input name="firstname" type="text" className="form-control" id="registerFirstName" placeholder="e.g. Alice" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Surname</label>      
                <input name="surname" type="text" className="form-control" id="registerSurname" placeholder="e.g. Smith" onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" id="email" className="form-control" type="email" placeholder="e.g. a.smith@gmail.com" onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label>NHS Number</label>
                <input name="nhsnumber" id="registerNHSNumber" className="form-control" placeholder="e.g. 987 654 4321" type="text" onChange={this.handleChange}/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )
    }

  render() {
    var form = 'Loading...'
    if (!this.userDetails.registered) {
      form = this.registerForm();
    } else {
      form = this.registeredMsg();
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default userRegistration ;
