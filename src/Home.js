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
//import './App.css'

import userInitialisation from './userInitialisation';

class Home extends userInitialisation {

  constructor(props) {
    super(props);

    this.mainHtml = [];

    this.state = {
      mainHtml: null
    };

    this.handleGetLinks = this.handleGetLinks.bind(this);
    this.handleNewLink = this.handleNewLink.bind(this);
    
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

  handleNewLink(event) {
    alert('Inserting dummy data into the blockchain - I will use a proper form in the future!');
    event.preventDefault();
    const contract = require('truffle-contract') ;

    const omneeRegistry = contract(omneeRegistryContract);
    omneeRegistry.setProvider(this.web3.currentProvider);
    var omneeRegistryInstance;

    this.web3.eth.getAccounts((error, accounts) => {
      omneeRegistry.deployed().then((instance) => {
        omneeRegistryInstance = instance;
        return omneeRegistryInstance.newLink.sendTransaction('http://google.com', 'Google', this.userDetails.omneeIDAddress, {from: accounts[0]});
      }).then((result) => {
        console.log(result);
      })
    })
  }

  appendHtml(url, title) {
    this.mainHtml.push(<figure className="figure ml-1"><a href={url}><img src={require("./imgs/Placeholder.png")} width="150" className="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure." /></a><figcaption className="figure-caption text-right">{title}</figcaption></figure>);

    this.setState({
       mainHtml: this.mainHtml
    });
 }

  handleGetLinks(event) {
    this.mainHtml = [];
    alert('Hey ' + this.userDetails.name + ', I am going to display your latest 30 links!');
    event.preventDefault();

    const contract = require('truffle-contract') ;

    const omneeRegistry = contract(omneeRegistryContract);
    omneeRegistry.setProvider(this.web3.currentProvider) ;
    var omneeRegistryInstance;

    var i = 0;
    var l = 0;
    while(i < 30) {
      console.log(i);
      this.web3.eth.getAccounts((error, accounts) => {
        omneeRegistry.deployed().then((instance) => {
          i = i + 1;
          omneeRegistryInstance = instance;
          return omneeRegistryInstance.getALink.call(this.userDetails.omneeIDAddress, i, {from: accounts[0]})
        }).then((result) => {
          console.log("reg-->" + result[0]);
          if(result[0] == "" || result[0] == null) {
            console.log("wow zero");
          } else {
            this.appendHtml(result[0], result[1]);
          }
        })
      })
      // safety measure for now
      if (l > 100) {
        i = 20;
      }
      l = l +1;
      i = i + 1;
      ////////
    } // for loop
    i = 0;    
  }

  render() {
    var form = 'Loading...'
    if (!this.userDetails.registered) {
      return(<div> Please sign up... </div>);
    } else {
    return (
      <div>
          <main role="main" className="container">
            <h1 className="mt-5">Welcome, {this.userDetails.name}</h1>
            <p className="lead">You have <span className="red">5</span> notifications, an urgent request from <a href="#">Great Ormond Street Hospital</a>, <span className="red">55</span> people have viewed your basic ID in the last 48 hours.</p>
            <p>You have linked <a href="">35 data sources</a>, see what more you can do with omnee Data Bank!</p>
            <form className="fl" onSubmit={this.handleGetLinks}>
              <button type="submit" className="btn btn-outline-primary">View my data</button>
            </form>
            
            <form className="fl ml-1" onSubmit={this.handleNewLink}>
              <button type="submit" className="btn btn-outline-warning">Create new link</button>
            </form>
            
          </main>
          {this.state.mainHtml}

          <div className="my-3 p-3 bg-white rounded box-shadow">
            <h6 className="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
            <div className="media text-muted pt-3">
              <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" className="mr-2 rounded" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1623fbaca26%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1623fbaca26%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2212.296875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">@username</strong>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
            </div>
            <div className="media text-muted pt-3">
              <img data-src="holder.js/32x32?theme=thumb&amp;bg=e83e8c&amp;fg=e83e8c&amp;size=1" alt="32x32" className="mr-2 rounded" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1623fbaca28%20text%20%7B%20fill%3A%23e83e8c%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1623fbaca28%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23e83e8c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2212.296875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">@username</strong>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
            </div>
            <div className="media text-muted pt-3">
              <img data-src="holder.js/32x32?theme=thumb&amp;bg=6f42c1&amp;fg=6f42c1&amp;size=1" alt="32x32" className="mr-2 rounded" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1623fbaca2a%20text%20%7B%20fill%3A%236f42c1%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1623fbaca2a%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%236f42c1%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2212.296875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">@username</strong>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
            </div>
            <small className="d-block text-right mt-3">
              <a href="#">All updates</a>
            </small>
          </div>
      </div>
    );
  }
  }
}

export default Home;