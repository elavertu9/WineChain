import React, {Component} from 'react';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About';
import WineListing from "./components/WineListing";
import "./App.css";
import getWeb3 from "./getWeb3";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {faTools} from '@fortawesome/free-solid-svg-icons';

library.add(faGlobe, faTools);

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: null,
            accounts: null,
            CR: {},
            CS: {},
            RC: {},

            loading: false,
            value: "",
            message: "",

            purchaserAddress: "",
            purchaserWineCoinCount: 0,
            walletAddress: "" // can hard code this to a test account
        };
    }

    componentDidMount = async() => {
        try {
            console.log("componentDidMount");
            let web3 = await getWeb3();

            // Get accounts
            let accounts = await web3.eth.getAccounts();

            let purchaserAdddress = accounts[0];

            console.log(purchaserAdddress);
        } catch(error) {
            console.log(error);
            alert("Failed to load web3, accounts, or contract. Check console for details.");
        }
    };

    render() {
        return (
            <Router>
                <div>
                    <Header></Header>
                </div>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/listing' component={WineListing}/>
                </Switch>
            </Router>
        );
    }
}

