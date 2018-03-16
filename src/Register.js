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
        super(props) ;


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.formName);
        event.preventDefault();

        const contract = require('truffle-contract');

        const omneePortal = contract(omneePortalContract);
        const omneeID = contract(omneeIDContract);

        omneePortal.setProvider(this.state.web3.currentProvider);
        omneeID.setProvider(this.state.web3.currentProvider);

        var omneePortalInstance, omneeIDInstance

        this.state.web3.eth.getAccounts((error, accounts) => {
            omneePortal.deployed().then((instance) => {
                omneePortalInstance = instance
                return omneePortalInstance.createID.sendTransaction(
                    1, 'Sirvan', 'Almasi', 'email', {from: accounts[0]})
            }).then((result) => {
                console.log(result)
            })
        })
    }

    handleChange(event) {
        this.setState({formEmail: event.target.value});
        console.log(event.target.varst)
    }

    registerForm() {
        return (
          <div className="row justify-content-md-center">
            <div className="registerForm col-md-5">
              <h4>Welcome, please enter your details</h4>
              Your Ethereum address: <br />
              <p className="address">{this.userDetails.omneeIDAddress}</p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>First name</label>
                  <input type="email" className="form-control" id="registerFirstName" placeholder="e.g. Alice" value="" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label>Surname</label>      
                  <input type="text" className="form-control" id="registerSurname" placeholder="e.g. Smith" value="" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input id="email" className="form-control" type="email" placeholder="e.g. a.smith@gmail.com"/>
                </div>
                <div className="form-group">
                  <label>NHS Number</label>
                  <input id="registerNHSNumber" className="form-control" placeholder="e.g. 987 654 4321" type="text"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        )
      }

    render() {
        const form = this.registerForm() ;
        return (
            <Router>

                    <div className="column middle">
                                    <h3>Your details are:</h3>
                                    <ul>
                                        <li><strong>First name:</strong> {this.userDetails.name}</li>
                                        <li><strong>Surname and other name(s):</strong> {this.userDetails.surname}</li>
                                        <li><strong>Email address:</strong> {this.userDetails.email}</li>
                                        <li><strong>Owner add:</strong>{this.userDetails.omneeIDAddress}</li>
                                    </ul>
                                    {form}

                    </div>

            </Router>
        );
    }
}

export default userRegistration ;
