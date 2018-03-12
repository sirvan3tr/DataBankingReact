import React, {Component} from "react";
import './App.css'

// Router
import {
    BrowserRouter as Router,
} from "react-router-dom";


class Home extends Component {
    render() {
        return (
            <Router>
                <div className="column middle">
                 <h1> Welcome to the Omnee Data Bank</h1>
                 <h2> </h2>
                </div>
            </Router>
        );
    }
}

export default Home;