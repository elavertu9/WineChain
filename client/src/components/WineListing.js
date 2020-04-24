import React, {Component} from "react";
import {Row, Col} from 'reactstrap';
import './resources/styles/WineListingStyles.css';
import WCTitle from './resources/images/wine-coins/wc-title.png';
// import WCBlue from './resources/images/wine-coins/wc-blue.png';
// import WCLightBlue from './resources/images/wine-coins/wc-lightblue.png';
// import WCRed from './resources/images/wine-coins/wc-red.png';
// import WCGreen from './resources/images/wine-coins/wc-green.png';
import AddWine from './AddWine';
import Toolbar from './Toolbar';
import WineCoin from './WineCoin';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./Pagination";

export default class WineListing extends Component {
    constructor(props) {
        super(props);

        // Need to populate array of existing coins using ABI
        // Used to populate coins on Wine Listing page
        this.state = {
            allCoins: [],
            addWineModal: false,
            input: {
                producer: "",
                varietal: "",
                country: "",
                vintage: 0
            },
            currentCoins: [],
            currentPage: null,
            totalPages: null
        };

        this.toggleAddWine = this.toggleAddWine.bind(this);
        this.addWine = this.addWine.bind(this);
    }

    componentDidUpdate = async() => {
      //console.log(this.props.WineCoin.methods);
        try {
            let totalSupply = await this.props.WineCoin.methods.totalSupply().call();

            let coinCollection = [];
            for(let i = 0; i < totalSupply; i++) {
                let coin = await this.props.WineCoin.methods.tokenByIndex(i).call();
                let cardData = await this.props.WineCoin.methods.getWineData(coin).call();
                let coinData =  {
                  producer: cardData.producer,
                  varietal: cardData.varietal,
                  country: cardData.country_of_origin,
                  vintage: cardData.vintage,
                  isVerified: cardData.verified_originator
                };
                coinCollection.push(
                    coinData
                );
            }

            this.setState({allCoins: coinCollection});

        } catch(error) {
            console.log(error);
        }
    };

    toggleAddWine() {
        this.setState({addWineModal: !this.state.addWineModal});
    }

    addWine(newInput) {
        console.log(newInput);
        let clientInput = {
            producer: newInput.producer,
            varietal: newInput.varietal,
            country: newInput.country,
            vintage: newInput.vintage
        };
        this.setState({input: clientInput}, () => {
            let results = this.addWineAPI();
            console.log(results);
        });
    }

    addWineAPI = async() => {
        try {
            console.log(this.state.input);
            await this.props.WineCoin.methods.addWineToChain(this.state.input.producer, this.state.input.varietal, this.state.input.country, this.state.input.vintage).send({from: this.props.address, gas: 500000});
            console.log("Succeeded");
            document.location.href="/listing";
        } catch(error) {
            console.log(error);
        }
    };

    onPageChanged = data => {
        const { allCoins } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCoins = allCoins.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentCoins, totalPages });
    };

    render() {
        const {
            allCoins,
            currentCoins,
            currentPage,
            totalPages
        } = this.state;
        const totalCoins = allCoins.length;

        if (totalCoins === 0) return null;

        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();

        return (
            <div className="container mb-5">
                <Row>
                    <Col className='element-center'>
                        <img alt="WineCoin" src={WCTitle} width='450px'/>
                    </Col>
                </Row>
                <br/>
                <Toolbar/>
                <div className="row d-flex flex-row py-5">
                    <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            <button className="btn-add" onClick={() => this.toggleAddWine()}><FontAwesomeIcon icon="plus-square" size='3x'/></button>
                            <AddWine toggle={this.toggleAddWine} updateProducer={this.updateProducer} updateVarietal={this.updateVarietal} updateCountry={this.updateCountry} updateVintage={this.updateVintage} isOpen={this.state.addWineModal} input={this.state.input} addWine={this.addWine}/>
                            <h2 className={headerClass}>
                                <strong className="text-secondary">{totalCoins}</strong>{" "}
                                WineCoins
                            </h2>
                            {currentPage && (
                                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                    Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                                    <span className="font-weight-bold">{totalPages}</span>
                                </span>
                            )}
                        </div>
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination
                                totalRecords={totalCoins}
                                pageLimit={6}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged}
                            />
                        </div>
                    </div>
                    {currentCoins.map((coin, index) => (
                        <WineCoin key={index} producer={coin.producer} varietal={coin.varietal} country={coin.country} vintage={coin.vintage} isVerified={coin.isVerified}/>
                    ))}
                </div>
            </div>
        );
    }
}