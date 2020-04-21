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
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import MetaMaskSettings from "./components/MetaMaskSettings";

library.add(faGlobe, faTools, faArrowRight);

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: null,
            accounts: null,
            CR: {},
            CS: {},
            RC: {},

            web3Error: false,
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

            this.setState({
                web3: web3
            });

        } catch(error) {
            console.log(error);
            this.setState({web3Error: true});
        }
    };

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <MetaMaskSettings web3={this.state.web3}/>
                    <br/>
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

