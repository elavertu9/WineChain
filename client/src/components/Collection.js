import React, {Component} from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import "./resources/styles/CollectionSytles.css";

export default class Collection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: this.props.address,
            isVerified: false,
            title: "",
            verifyAddress: '',
            origTitle: '',
            alertModal: false
        };

        this.verifyOriginator = this.verifyOriginator.bind(this);
        this.updateVerifyAddress = this.updateVerifyAddress.bind(this);
        this.updateOrigTitle = this.updateOrigTitle.bind(this);
        this.verifyAll = this.verifyAll.bind(this);
        this.toggleWarning = this.toggleWarning.bind(this);
    }

    componentDidUpdate = async() => {
        try {
            let isVerified = await this.props.WineCoin.methods.isVerifiedOriginator(this.props.address).call();

            let title = await this.props.WineCoin.methods.getOriginatorTitle(this.props.address).call();

            this.setState({
                address: this.props.address,
                isVerified: isVerified,
                title: title
            });
        } catch(error) {
            console.log(error);
        }
    };

    verifyOriginator = async() => {
      try {
          console.log("verify initiated...");

          await this.props.WineCoin.methods.addVerifiedOriginator(this.state.verifyAddress, this.state.origTitle).send({from: this.props.address, gas: 500000});

          console.log("Success");

          window.location.href = "/collection";
      } catch(error) {
          console.log(error);
      }
    };

    updateVerifyAddress(e) {
        e.preventDefault();
        this.setState({verifyAddress: e.target.value})
    }

    updateOrigTitle(e) {
        e.preventDefault();
        this.setState({origTitle: e.target.value});
    }

    verifyAll = async() => {
        try {
            console.log("verify all initiated...");
            if(this.state.isVerified) {
                // Get coins
                let numberOwned = await this.props.WineCoin.methods.balanceOf(this.props.address).call();

                for(let i = 0; i < numberOwned; i++) {
                    let coin = await this.props.WineCoin.methods.tokenOfOwnerByIndex(this.props.address, i).call();

                    await this.props.WineCoin.methods.updateBottleVerification(coin).send({from: this.props.address, gas: 500000});
                }

                console.log("Success!");

                window.location.href = "/collection";

            } else {
                this.toggleWarning();
            }
        } catch(error) {
            console.log(error);
        }
    };

    toggleWarning() {
        this.setState({alertModal: !this.state.alertModal});
    }

    render() {
        return (
          <Container>

              <Modal centered={true} isOpen={this.state.alertModal}>
                  <ModalHeader toggle={() => this.toggleWarning()}>Warning!</ModalHeader>
                  <ModalBody>
                      <h4>You must become a verified originator before verifying your coins...</h4>
                  </ModalBody>
              </Modal>


              <Row>
                <Col>
                    <h2><strong>Account Settings</strong></h2>
                </Col>
              </Row>

              <br/>

              <Row>
                  <Col>
                      <h4><strong>Originator Title: </strong> {this.state.title}</h4>
                      <h4><strong>Account Verified: </strong> {this.state.isVerified ? "True" : "False"}</h4>
                  </Col>

                  <Col>
                      <p>This operation can take a while...</p>
                      <Button color="primary" onClick={() => this.verifyAll()}>Verify All Coins</Button>
                  </Col>
              </Row>

              <br/>

              {this.props.contractOwnerAddress === this.props.address ?
              <Row>
                  <Col>
                      <h4><strong>Add Verified Originator</strong></h4>
                      <h4>You are the contract owner</h4>
                      <Form>
                          <FormGroup>
                              <Label for="verifyAddress">Address</Label>
                              <Input type="text" name="verifyAddress" id="verifyAddress" value={this.state.verifyAddress} onChange={(e) => this.updateVerifyAddress(e)} placeholder="Address to verify..." required/>
                          </FormGroup>

                          <FormGroup>
                              <Label for="origTitle">Title</Label>
                              <Input type="text" name="origTitle" id="origTitle" value={this.state.origTitle} onChange={(e) => this.updateOrigTitle(e)} placeholder="Originator Title..." required/>
                          </FormGroup>
                      </Form>
                      <Button color="success" type="submit" onClick={() => this.verifyOriginator()}>Submit</Button>
                  </Col>
              </Row> : <p/>}
          </Container>
        );
    }
}