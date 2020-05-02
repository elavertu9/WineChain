import React, {Component} from "react";
import {Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap';
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
import WCGreen from "./resources/images/wine-coins/wc-green.png";
import WCRed from "./resources/images/wine-coins/wc-red.png";

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
            totalPages: null,
            search: false,
            infoModal: false,
        };

        this.toggleAddWine = this.toggleAddWine.bind(this);
        this.addWine = this.addWine.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleInfoModal = this.toggleInfoModal.bind(this);
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
                  isVerified: cardData.verified_originator,
                  id: coin
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

    toggleSearch() {
        this.setState({search: !this.state.search});
    }

    toggleInfoModal() {
        this.setState({infoModal: !this.state.infoModal});
    }

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
                <Modal isOpen={this.state.infoModal} toggle={() => this.toggleInfoModal()}>
                    <ModalHeader toggle={() => this.toggleInfoModal()}>Info</ModalHeader>
                    <ModalBody>
                        <table className="table table-hover">
                            <tbody>
                            <tr>
                                <td className="element-center"><img
                                    src={WCGreen}
                                    width="35%"
                                    height="20%"
                                    alt="Verified WineCoin Producer"
                                /></td>
                                <td>Coin listed by verified producer</td>
                            </tr>

                            <tr>
                                <td className="element-center"><img
                                    src={WCRed}
                                    width="35%"
                                    height="20%"
                                    alt="Unverified WineCoin Producer"/></td>
                                <td>Coin listed by unverified producer</td>
                            </tr>

                            <tr>
                                <td className="element-center"><FontAwesomeIcon icon="user-check" size="3x"/></td>
                                <td>Verified producer icon</td>
                            </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>


                <Row>
                    <Col className='element-center'>
                        <img alt="WineCoin" src={WCTitle} width='450px'/>
                    </Col>
                </Row>
                <br/>


                <Row className="element-center">
                    <Col className="element-center">
                        <div className='icon-bar element-center'>
                            <a onClick={() => this.toggleAddWine()}><FontAwesomeIcon className="icons" icon="plus-square" size='3x'/></a>
                            <a onClick={() => this.toggleSearch()}><FontAwesomeIcon className="icons" icon='search' size='3x'/></a>
                            <a onClick={() => this.toggleInfoModal()}><FontAwesomeIcon className="icons" icon="info-circle" size='3x'/></a>
                        </div>
                    </Col>
                </Row>

                {this.state.search ? <div><br/><Toolbar/></div> : <p/>}

                <div className="row d-flex flex-row py-5">
                    <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">
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
                        <WineCoin WineCoin={this.props.WineCoin} address={this.props.address} key={index} producer={coin.producer} varietal={coin.varietal} country={coin.country} vintage={coin.vintage} isVerified={coin.isVerified} id={coin.id}/>
                    ))}
                </div>
            </div>
        );
    }
}