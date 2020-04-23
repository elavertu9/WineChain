import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import "./resources/styles/CollectionSytles.css";

export default class Collection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: this.props.address,
            isVerified: false,
            title: ""
        };
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

    render() {
        return (
          <Container>
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
              </Row>
          </Container>
        );
    }
}