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
import Contact from "./Contact";
import About from "./active";

//import active from "./active";


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 45,
      account: 0,
      web3: null,
      registered: false,
      name: 'n/a',
      surname: 'n/a',
      email: 'n/a',
      owner: 'n/a',
      formName: '',
      formSurname: '',
      formEmail: ''
    }

    this.userDetail = {
      name: null,
      surname: null,
      email: null,
      omneeIDAddress: null
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        account: results.web3.eth.accounts[0]
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')

    const omneePortal = contract(omneePortalContract)
    const omneeID = contract(omneeIDContract)
    
    omneePortal.setProvider(this.state.web3.currentProvider)
    omneeID.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions
    var omneePortalInstance, omneeIDInstance

    // Record the current account holder to display on page
    this.setState({account: this.state.web3.eth.accounts[0]})
    
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      omneePortal.deployed().then((instance) => {
        omneePortalInstance = instance
        //return omneePortalInstance.set(5, {from: accounts[0]})
        return omneePortalInstance.userExists.call({from: accounts[0]})
      }).then((result) => {
        if(result.c[0] === 1) // user doesn't exist, we need to create an id
        {
          console.log('User doesnt exist, attempting to create user')
          this.setState({registered: false});
        } else {
          console.log('User exists, moving on...')
          this.setState({registered: true});
        }
      }).then((result) => {
        console.log('Getting omneeID address')
        // get the omneeID ID
        return omneePortalInstance.id.call({from: accounts[0]})
      }).then((result) => {
        console.log(result)
        this.userDetail.omneeIDAddress = result;
        console.log('Connecting to omneeID contract to get info')
        omneeIDInstance = omneeID.at(result);
        return omneeIDInstance.getInfo.call({from: accounts[0]})
      }).then((result) => {
        console.log(result)
        if (result === undefined || result === null || result[0] === "") {
          console.log('No user info found')
        } else {
          console.log('User info found')
          this.setState({
            name: result[0],
            surname: result[1],
            email: result[2],
            owner: result[3]
          })
        }
      })
    })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.formName);
    event.preventDefault();

    const contract = require('truffle-contract')

    const omneePortal = contract(omneePortalContract)
    const omneeID = contract(omneeIDContract)
    
    omneePortal.setProvider(this.state.web3.currentProvider)
    omneeID.setProvider(this.state.web3.currentProvider)

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
      <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
              <div className="pure-control-group">
                  <label>First Name</label>
                  <input id="firstname" type="text" 
                    placeholder="First Name" value={this.state.formName} onChange={this.handleChange} />
                  <span className="pure-form-message-inline">This is a required field.</span>
              </div>

              <div className="pure-control-group">
                  <label>Second Name</label>
                  <input id="secondname" type="text" placeholder="Second Name" value={this.state.formSurname}/>
              </div>

              <div className="pure-control-group">
                  <label>Email Address</label>
                  <input id="email" type="email" placeholder="Email Address"/>
              </div>

              <div className="pure-controls">
                  <button type="submit" className="pure-button pure-button-primary">Submit</button>
              </div>
      </form>
    )
  }

  render() {
    const form = this.registerForm()
    return (
      <Router>
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
        <a href="/home" className="pure-menu-heading pure-menu-link">
          <img className="header-logo" src={require('./imgs/omnee_logo_white.png')} width="120"/>
        </a>
        <Link to="/" className="pure-menu-heading pure-menu-link">Home</Link>        
        <Link to="/active" className="pure-menu-heading pure-menu-link">Solution</Link>
        <Link to="/Contact" className="pure-menu-heading pure-menu-link">About</Link>             
        <Link to="/Contact" className="pure-menu-heading pure-menu-link">Contact</Link>
        </nav>
        <Route path="/Contact" component={Contact} />
        <Route path="/About" component={About} />
        

        <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <div className="padding20">
            <h1>What is omnee?</h1>
            <h2>omnee is a decentralised identity and data management network</h2>
            </div>
          </div>
          <div className="pure-u-1-2">
            <div className="padding20">
            <h3>Welcome, {this.state.name} {this.state.surname}</h3>
            Your Ethereum address: <br />
            <p className="address">{this.state.account}</p>

            Your omneeID address: <br />
            <p className="address">{this.userDetail.omneeIDAddress}</p>
            <h3>Your details are:</h3>
            <ul>
              <li><strong>First name:</strong> {this.state.name}</li>
              <li><strong>Surname and other name(s):</strong> {this.state.surname}</li>
              <li><strong>Email address:</strong> {this.state.email}</li>
              <li><strong>Owner add:</strong> {this.state.owner}</li>
            </ul>
              {form}
              </div>
          </div>
        </div>
        </main>
      </div>
      </Router>
    );
  }
}

export default App
