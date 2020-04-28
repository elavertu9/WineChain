import React, { Component, Fragment } from "react";
import WCGreen from './resources/images/wine-coins/wc-green.png';
import WCRed from './resources/images/wine-coins/wc-red.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Modal, ModalBody, Row, Col, ModalFooter, ModalHeader, Button} from 'reactstrap';

class WineCoin extends Component {
    constructor(props) {
        super(props);

        this.state = {
          modal: false,
          isCoinOwner: false,
          coinOwner: ""
        };

        this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
        this.transferCoin = this.transferCoin.bind(this);
        this.burnCoin = this.burnCoin.bind(this);
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

    transferCoin() {
        console.log("Transfer button clicked");
        // need to prompt user with form to enter transfer to address
    }

    burnCoin() {
        console.log("Burn button clicked");
        // need to hit with are you sure modal and then make the call
    }

    render() {
        return (
            <Fragment>




                <Modal isOpen={this.state.modal} toggle={() => this.toggleMoreInfo()}>
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
                                    <Button onClick={() => this.transferCoin()} color="primary">Transfer</Button>
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
