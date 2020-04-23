import React, {Component} from "react";
import {Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody, Button} from "reactstrap";
import "./resources/styles/MetaMaskSettingsStyles.css";
import Web3Modal from "./Web3Modal";
import WineCoin from "./WineCoin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: this.props.web3,
            address: "",
            web3Error: false,
            numCoins: 0,
            coins: [],
            coinsModal: false
        };

        this.renderMyCoins = this.renderMyCoins.bind(this);
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

            //let wineData = await this.props.WineCoin.methods.getWineData(1);
            let myCoins = [];
            for(let i = 0; i < numberOwned; i++) {
                let coin = await this.props.WineCoin.methods.tokenOfOwnerByIndex(address, i).call();
                let cardData = await this.props.WineCoin.methods.getWineData(coin).call();
                myCoins.push(
                    <WineCoin
                        producer={cardData.producer}
                        origin={cardData.country_of_origin}
                        varietal={cardData.varietal}
                        vintage={cardData.vintage}
                        isVerified={cardData.verified_originator}
                    />

            );
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

    renderMyCoins() {
        let coinTable = [];

        for(let i = 0; i < this.state.coins.length; i+=2) {
            let rowData = [];
            if(i+1 >= this.state.coins.length) {
                rowData.push(<td key={i}>{this.state.coins[i]}</td>);
            } else {
                rowData.push(<td key={i}>{this.state.coins[i]}</td>);
                rowData.push(<td key={i+1}>{this.state.coins[i + 1]}</td>);
            }
            coinTable.push(<tr key={i}>{rowData}</tr>);
        }
        return coinTable;
    }

    toggleMyCoins() {
        this.setState({coinsModal: !this.state.coinsModal});
    }

    render() {
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
                        <ModalHeader toggle={() => this.toggleMyCoins()}>My Coins</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                            <Row>
                                <Col className="offset-sm-1">
                                    <table>
                                        {this.renderMyCoins()}
                                    </table>
                                </Col>
                            </Row>
                        <ModalFooter>
                            <Button color="danger" onClick={() => this.toggleMyCoins()}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </Row>
            </Container>
        );
    }
}