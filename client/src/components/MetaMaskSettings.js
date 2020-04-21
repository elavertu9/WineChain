import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import "./resources/styles/MetaMaskSettingsStyles.css";
import Web3Modal from "./Web3Modal";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: this.props.address,
            address: "",
            web3Error: false
        }
    }

    componentDidUpdate = async() => {
        try {
            // Get accounts
            let accounts = await this.props.web3.eth.getAccounts();

            let address = accounts[0];

            this.setState({address: address});
        } catch(error) {
            console.log(error);
            this.setState({web3Error: true});
        }
    };

    render() {
        return (
            <Container className="account-border">
                <Row className="pad">
                    <Col className="element-center">
                        <Web3Modal web3Error={this.state.web3Error}/>
                        <h6><strong>Account Address:</strong> {this.state.address}</h6>
                    </Col>
                </Row>
            </Container>
        );
    }
}