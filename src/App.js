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

// Import webpages
import Contact from "./components/Contact";
import About from "./components/About";
import Register from "./Register";
import Home from"./Home";

// Utilities
import './css/oswald.css'
import './css/open-sans.css'
//import './css/pure-min.css'
import './css/bootstrap.css'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
class newOne extends Component {
 constructor(props) {
  super(props);
  this.userDetailz = {
    name: null,
    surname: null,
    email: null,
    nhsNumber: null,
    omneeIDAddress: null
  };
 }


}; 

class App extends newOne {
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

    this.userDetail = {
      name: null,
      surname: null,
      email: null,
      nhsNumber: null,
      omneeIDAddress: null
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Define all user detials
  setUser(_name, _surname, _em, _nhsN, _omIDAd) {
    this.userDetail.name = _name
    this.userDetail.surname = _surname;
    this.userDetail.email = _em;
    this.userDetail.nhsNumber = _nhsN;
    this.userDetail.omneeIDAddress = _omIDAd;
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        account: results.web3.eth.accounts[0]
      }) ;

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * Authenticate the user
     *
     * Need to be part of a state management library (redux or MobX)
     * 
     */

    const contract = require('truffle-contract') ;

    // Get the contracts
    const omneePortal = contract(omneePortalContract) ;
    const omneeID = contract(omneeIDContract) ;
    
    omneePortal.setProvider(this.state.web3.currentProvider) ;
    omneeID.setProvider(this.state.web3.currentProvider) ;

    // Declaring this for later so we can chain functions
    var omneePortalInstance, omneeIDInstance ;

    // Record the current account holder to display on page
    //this.setState({account: this.state.web3.eth.accounts[0]}) ;
    
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      omneePortal.deployed().then((instance) => {
        omneePortalInstance = instance
        //return omneePortalInstance.set(5, {from: accounts[0]})
        return omneePortalInstance.userExists.call({from: accounts[0]})
      }).then((result) => {
        if(result.c[0] === 1) // user doesn't exist, we need to create an id
        {
          console.log('User doesnt exist, attempting to create user') ;
          this.setState({registered: false});
        } else {
          console.log('User exists, moving on...');
          this.setState({registered: true});
        }
      }).then((result) => {
        console.log('Getting omneeID address');
        // get the omneeID ID
        return omneePortalInstance.id.call({from: accounts[0]})
      }).then((result) => {
        console.log(result);
        this.userDetail.omneeIDAddress = result;
        console.log('Connecting to omneeID contract to get info');
        omneeIDInstance = omneeID.at(result);
        return omneeIDInstance.getInfo.call({from: accounts[0]})
      }).then((result) => {
        console.log(result) ;
        if (result === undefined || result === null || result[0] === "") {
          console.log('No user info found')
        } else {
          console.log('User info found') ;
          this.setUser(result[0], result[1], result[2], result[3].c[0], result[4]);
          this.userDetailz.email = result[2];
          this.setState({
            name: result[0],
            surname: result[1],
            email: result[2],
            nhsNumber: result[3].c[0],
            owner: result[4]
          })
        }
      })
    })
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

  registerForm() {
    return (
      <div className="row justify-content-md-center">
        <div className="registerForm col-md-5">
          <h4>Welcome, please enter your details</h4>
          Your Ethereum address: <br />
          <p className="address">{this.state.account}</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First name</label>
              <input type="email" className="form-control" id="registerFirstName" placeholder="e.g. Alice" value={this.state.formName} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Surname</label>      
              <input type="text" className="form-control" id="registerSurname" placeholder="e.g. Smith" value={this.state.formSurname} />
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
          render={(props) => <Contact {...props} name={this.state.name} />}
        />

        <Route path="/About" component={About} />
        <Route path="/Register" component={Register} />
        <Route path="/Home" component={Home} />
        
        <h5>{this.userDetailz.email}</h5>
        {form}
          <div className="columnside">
              <h3>Welcome, {this.state.name} {this.state.surname}</h3>
              Your Ethereum address: <br />
              <p className="address">{this.state.account}</p>

              Your omneeID address: <br />
              <p className="address">{this.userDetail.omneeIDAddress}</p>
          </div>
          </div>
          </div>
          </div>
          

      </Router>
    );
  }
}

export default App ;
