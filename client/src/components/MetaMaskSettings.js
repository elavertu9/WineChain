import React, {Component} from "react";
import {Container, Row, Col, Modal, ModalFooter, ModalBody, Button} from "reactstrap";
import "./resources/styles/MetaMaskSettingsStyles.css";
import Web3Modal from "./Web3Modal";
import WineCoin from "./WineCoin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Pagination from "./Pagination";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: this.props.web3,
            address: "",
            web3Error: false,
            numCoins: 0,
            coins: [],
            coinsModal: false,
            currentCoins: [],
            currentPage: null,
            totalPages: null
        };

        this.toggleMyCoins = this.toggleMyCoins.bind(this);
    }

    componentDidUpdate = async() => {
        try {
            // Get accounts
            let accounts = await this.props.web3.eth.getAccounts();
            let address = accounts[0];

            this.props.updatePurchaserAddress(address);

            // Get coins
            let numberOwned = await this.props.WineCoin.methods.balanceOf(address).call();

            let myCoins = [];
            for(let i = 0; i < numberOwned; i++) {
                let coin = await this.props.WineCoin.methods.tokenOfOwnerByIndex(address, i).call();
                let cardData = await this.props.WineCoin.methods.getWineData(coin).call();
                let coinData =  {
                    producer: cardData.producer,
                    varietal: cardData.varietal,
                    country: cardData.country_of_origin,
                    vintage: cardData.vintage,
                    isVerified: cardData.verified_originator
                };
                myCoins.push(coinData);
            }

            this.setState({
                address: address,
                numCoins: numberOwned,
                coins: myCoins
            });

        } catch(error) {
            console.log(error);
        }
    };

    toggleMyCoins() {
        this.setState({coinsModal: !this.state.coinsModal});
    }

    onPageChanged = data => {
        const { coins } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCoins = coins.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentCoins, totalPages });
    };

    render() {
        const {
            coins,
            currentCoins,
            currentPage,
            totalPages
        } = this.state;
        const totalCoins = coins.length;

        if (totalCoins === 0) return null;

        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();
        return (
            <Container className="account-border">
                <br/>
                <a href="/collection" className="cog"><FontAwesomeIcon icon="cog" size='3x'/></a>
                <Row className="pad">
                    <Col className="element-center">
                        <Web3Modal web3Error={this.state.web3Error}/>
                        <h6><strong>Account Address:</strong> {this.state.address}</h6>
                        <h5><strong>You Own:</strong> {this.state.numCoins} WineCoins</h5>
                        <button className="btn-wc" onClick={() => this.toggleMyCoins()}>My Coins</button>
                    </Col>


                    <Modal isOpen={this.state.coinsModal} toggle={() => this.toggleMyCoins()} size="xl">
                        <ModalBody>
                        </ModalBody>
                        <div className="container mb-5">
                            <div className="row">
                                <div className="w-100 px-4 py-1 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCoins}</strong>{" "}
                                            Owned WineCoins
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
                        <ModalFooter>
                            <Button color="danger" onClick={() => this.toggleMyCoins()}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </Row>
            </Container>
        );
    }
}