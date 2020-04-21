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
import WineChainContract from './contracts/WineChain';

library.add(faGlobe, faTools, faArrowRight);

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: null,
            accounts: null,
            WC: {},

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
            let web3 = await getWeb3();

            this.setState({
                web3: web3
            });

            let networkId = await web3.eth.net.getId();
            let deployedNetwork = WineChainContract.networks[networkId];
            let WC = new web3.eth.Contract(
                WineChainContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            //let mySym = await WC.methods.symbol().call();
            //console.log("my symbol", mySym);
            console.log(WC.methods);

            this.setState({
                WC: WC
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
                    <Route exact path='/listing' render={(props) => <WineListing {...props} WC={this.state.WC}/>}/>
                </Switch>
            </Router>
        );
    }
}

