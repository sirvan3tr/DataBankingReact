import React, { Component } from "react";
 
class Contact extends Component {
  render() {
    return (
      <div>
        <h2>GOT QUESTIONS?</h2>
        <h2>{this.props.name}</h2>
        <p>
          Hello world
        </p>
      </div>
    );
  }
}
 
export default Contact;