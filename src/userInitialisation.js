import React, { Component } from 'react'

// Blockchain Specifics
// Contracts and JSONRPC Library
import omneePortalContract from '../build/contracts/omneePortal.json'
import omneeIDContract from '../build/contracts/omneeID.json'
import getWeb3 from './utils/getWeb3'

class userInitialisation extends Component {
    constructor(props) {
      super(props);
      this.userDetails = {
        registered: null,
        accountAddress: null,
        name: null,
        surname: null,
        email: null,
        nhsNumber: null,
        omneeIDAddress: null
      };
      this.web3 = null;
    }
  
    // Define all user detials
    setUser(_name, _surname, _em, _nhsN, _omIDAd) {
      this.userDetails.name = _name
      this.userDetails.surname = _surname;
      this.userDetails.email = _em;
      this.userDetails.nhsNumber = _nhsN;
      this.userDetails.omneeIDAddress = _omIDAd;
    }
  
    // Get and mount Web3
    componentWillMount() {
      // Get network provider and web3 instance.
      // See utils/getWeb3 for more info.
      getWeb3
      .then(results => {
        this.userDetails.accountAddress = results.web3.eth.accounts[0];
        this.web3 = results.web3;
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
      
      omneePortal.setProvider(this.web3.currentProvider) ;
      omneeID.setProvider(this.web3.currentProvider) ;
  
      // Declaring this for later so we can chain functions
      var omneePortalInstance, omneeIDInstance ;

      // Get accounts.
      this.web3.eth.getAccounts((error, accounts) => {
        omneePortal.deployed().then((instance) => {
          omneePortalInstance = instance
          return omneePortalInstance.userExists.call({from: accounts[0]})
        }).then((result) => {
          if(result.c[0] === 1) // user doesn't exist, we need to create an id
          {
            console.log('User doesnt exist, attempting to create user') ;
            this.userDetails.registered = false;
          } else {
            console.log('User exists, moving on...');
            this.userDetails.registered = true;
          }
        }).then((result) => {
          console.log('Getting omneeID address');
          // get the omneeID ID
          return omneePortalInstance.id.call({from: accounts[0]})
        }).then((result) => {
          console.log(result);
          this.userDetails.omneeIDAddress = result;
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
            this.userDetails.email = result[2];
            this.forceUpdate()
          }
        })
      })
    }
  
  
  };

  export default userInitialisation;