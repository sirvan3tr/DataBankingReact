import React, {Component} from "react";
//import './App.css'

// Router
import {
    BrowserRouter as Router,
} from "react-router-dom";


class About extends Component {
    render() {
        return (
            <Router>
                <div className="column middle">
                    <h1>What is Omnee?</h1>
                    <h2>omnee is a decentralised identity and data management network</h2>
                    <p> Enter text here for about page</p>
                </div>
            </Router>
        );
    }
}

export default About;