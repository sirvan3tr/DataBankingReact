//import getWeb3 from './utils/getWeb3'
import React, { Component } from 'react'

 class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      account: 0
    }


    this.getAccount();
    
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        //web3: results.web3,
        account: results.web3.eth.accounts[0]
      })
      this.getAccount()
   }).catch(() => {
     console.log("Error Loading Web3")
   })
  }

  getAccount() {
    console.log(this.state.account)
    return 1;
  }
}

export default (new userInfo)