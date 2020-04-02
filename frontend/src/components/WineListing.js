import React, {Component} from "react";
import {Container, Row, Col} from 'reactstrap';

export default class WineListing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container>
              <Row>
                  <Col>
                      <h1>Wine Listing</h1>
                  </Col>
              </Row>
          </Container>
        );
    }
}