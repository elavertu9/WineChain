import React, {Component} from "react";
import {Container, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import Error from './resources/images/error.png';
import "./resources/styles/Web3ModalStyles.css";

export default class Web3Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.props.web3Error} size="lg">
                    <ModalHeader className="element-center">Web3 Error</ModalHeader>
                    <ModalBody>
                        <img src={Error} alt="Error" width='300px' height='300px'/>
                        Please make sure the Metamask extension is installed...
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}