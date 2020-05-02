import React, { Component, Fragment } from "react";
import WCGreen from './resources/images/wine-coins/wc-green.png';
import WCRed from './resources/images/wine-coins/wc-red.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal, ModalBody, Row, Col, ModalFooter, ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap';

class WineCoin extends Component {
    constructor(props) {
        super(props);

        this.state = {
          modal: false,
          isCoinOwner: false,
          coinOwner: "",
          transferModal: false,
          toAddress: ""
        };

        this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
        this.burnCoin = this.burnCoin.bind(this);
        this.updateToAddress = this.updateToAddress.bind(this);
        this.toggleTransfer = this.toggleTransfer.bind(this);
    }
    toggleMoreInfo() {
        this.setState({modal: !this.state.modal});
    }

    componentWillReceiveProps = async() => {
      let coinOwner = await this.props.WineCoin.methods.ownerOf(this.props.id).call();
      if(coinOwner === this.props.address) {
          this.setState({
              isCoinOwner: true,
              coinOwner: coinOwner
          });
      }  else {
          this.setState({
              isCoinOwner: false,
              coinOwner: coinOwner
          });
      }
    };

    burnCoin = async() => {
        try {
            console.log("Burn initiated....");

            await this.props.WineCoin.methods.burn(this.props.id).send({from: this.props.address, gas: 500000});

            console.log("Succeeded!");

            window.location.href = "/listing";

        } catch(error) {
            console.log(error);
        }
    };

    toggleTransfer() {
        this.setState({transferModal: !this.state.transferModal});
    }

    updateToAddress(e) {
        e.preventDefault();
        this.setState({toAddress: e.target.value});
    }

    formSubmit = async() => {
        try {
            console.log("transfer initiated...");

            await this.props.WineCoin.methods.transferFrom(this.props.address, this.state.toAddress, this.props.id).send({from: this.props.address, gas: 500000});

            console.log("Succeeded");

            window.location.href = "/listing";
        } catch(error) {
            console.log(error);
        }

    };

    render() {
        return (
            <Fragment>


                <Modal isOpen={this.state.transferModal} toggle={() => this.toggleTransfer()} size="lg">
                    <ModalHeader onClick={() => this.toggleTransfer()}>Transfer Coin</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="toAddress">Address</Label>
                                <Input type="text" name="toAddress" id="toAddress" value={this.state.toAddress} onChange={(e) => this.updateToAddress(e)} placeholder="Address to transfer to..." required/>
                            </FormGroup>

                        </Form>
                        <Button color="success" type="submit" onClick={() => this.formSubmit()}>Submit</Button>
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.modal} toggle={() => this.toggleMoreInfo()} size="lg">
                    <ModalHeader toggle={() => this.toggleMoreInfo()}><strong>
                        {this.props.isVerified ? <img
                            src={WCGreen}
                            width="15%"
                            height="15%"
                            alt="WineCoin"
                        /> :
                            <img
                                src={WCRed}
                                width="15%"
                                height="15%"
                                alt="WineCoin"/>} ID: </strong>{this.props.id}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <table className="table table-hover">
                                    <tbody>
                                    <tr>
                                        <th>Owner</th>
                                        <td>{this.state.coinOwner}</td>
                                    </tr>

                                    <tr>
                                        <th>Producer</th>
                                        <td>{this.props.producer}</td>
                                    </tr>

                                    <tr>
                                        <th>Varietal</th>
                                        <td>{this.props.varietal}</td>
                                    </tr>

                                    <tr>
                                        <th>Country</th>
                                        <td>{this.props.country}</td>
                                    </tr>

                                    <tr>
                                        <th>Vintage</th>
                                        <td>{this.props.vintage}</td>
                                    </tr>

                                    <tr>
                                        <th>Verified</th>
                                        <td>{this.props.isVerified ? "True" : "False"}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.isCoinOwner

                            ?

                            <Row>
                                <Col className="element-center">
                                    <Button onClick={() => this.toggleTransfer()} color="primary">Transfer</Button>
                                </Col>

                                <Col className="element-center">
                                    <Button onClick={() => this.burnCoin()} color="danger">Burn</Button>
                                </Col>
                            </Row>

                            :

                            <Row>
                                <Col className="element-center">
                                    <h5>Only the owner of this coin may perform transfer/burn operations...</h5>
                                </Col>
                            </Row>

                        }
                    </ModalFooter>
                </Modal>






                <div className="col-sm-6 col-md-4 country-card">
                    <div className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
                        <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">

                            <div className="row">
                                <div className="col">
                                    <div className="image-div">
                                        {this.props.isVerified ?
                                        <img
                                            src={WCGreen}
                                            width="30%"
                                            height="30%"
                                            alt="WineCoin"
                                            className="wc-image"
                                        />
                                        :
                                            <img
                                                src={WCRed}
                                                width="30%"
                                                height="30%"
                                                alt="WineCoin"
                                                className="wc-image"
                                            />}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col">
                            {this.props.isVerified ? <FontAwesomeIcon icon="user-check" size="2x"/>
                                : <p/>}
                            <br/>

                            <strong>ID: </strong>{this.props.id}

                            <div className="text-div">

                                <span className="country-name text-dark d-block font-weight-bold">
                                        {this.props.producer}
                                </span>
                                <span className="country-region text-secondary text-uppercase">
                                        {this.props.country}
                                </span>
                            </div>

                            <Button className="more-btn" onClick={() => this.toggleMoreInfo()} color="primary">More Info</Button>
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}


export default WineCoin;
