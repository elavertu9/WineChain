import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container>
              <Row>
                  <h1>Welcome to the WineChain homepage!</h1>

              </Row>
          </Container>
        );
    }
}