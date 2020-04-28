import React, {Component} from 'react';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About';
import WineListing from "./components/WineListing";
import Collection from "./components/Collection";
import "./App.css";
import getWeb3 from "./getWeb3";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {faTools} from '@fortawesome/free-solid-svg-icons';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import MetaMaskSettings from "./components/MetaMaskSettings";
//import WineCoinContract from './contracts/WineCoin';
import abi from './abi.json';

library.add(faGlobe, faTools, faArrowRight, faUserCheck, faCog, faPlusSquare, faInfoCircle, faSearch);

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: null,
            accounts: null,
            WineCoin: {},

            web3Error: false,
            loading: false,
            value: "",
            message: "",

            purchaserAddress: "",
            purchaserWineCoinCount: 0,
            walletAddress: "" // can hard code this to a test account
        };

        this.updatePurchaserAddress = this.updatePurchaserAddress.bind(this);
    }

    // Runs before render to ensure everything is calculated
    componentDidMount = async() => {
        try {
            // Get contract hosted on rinkeby
            // WineCoinContract points to contract address
            // WineChainContract points to token address

            let web3 = await getWeb3();

            const contractAddress = "0x13fFf07b32148107eD71595dE1bF76f8d4A08141";

            let WineCoin = new web3.eth.Contract(abi, contractAddress);

            //let networkId = await web3.eth.net.getId();

            // let deployedNetwork = WineCoinContract.networks[networkId];
            // let WineCoin = new web3.eth.Contract(
            //     WineCoinContract.abi,
            //     deployedNetwork && deployedNetwork.address
            // );

            // Should print WCT
            //let mySym = await WineCoin.methods.symbol().call();
            //console.log("my symbol", mySym);

            this.setState({
                WineCoin: WineCoin,
                web3: web3
            });

        } catch(error) {
            console.log(error);
            this.setState({web3Error: true});
        }
    };

    updatePurchaserAddress(address) {
        this.setState({purchaserAddress: address});
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <MetaMaskSettings web3={this.state.web3} WineCoin={this.state.WineCoin} updatePurchaserAddress={this.updatePurchaserAddress}/>
                    <br/>
                </div>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/collection' render={(props) => <Collection {...props} address={this.state.purchaserAddress} WineCoin={this.state.WineCoin}/>}/>
                    <Route exact path='/listing' render={(props) => <WineListing {...props} WineCoin={this.state.WineCoin} address={this.state.purchaserAddress}/>}/>
                </Switch>
            </Router>
        );
    }
}

