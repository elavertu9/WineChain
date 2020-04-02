import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import "./resources/styles/HomeStyles.css";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container>
              <Row>
                  <Col className="element-center">
                      <h1>Welcome to the WineChain homepage!</h1>
                  </Col>
              </Row>

              <br/>
              <Row>
                  <Col className="element-center">
                      <button className="button">Example</button>
                  </Col>
              </Row>
          </Container>
        );
    }
}