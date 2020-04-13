import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import "./resources/styles/HomeStyles.css";
import HomeImage from './resources/images/wine-bottles.jpeg';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container>
              <Row>
                  <Col className="element-center">
                      <h1>Welcome to WineChain</h1>
                      <br/>
                      <img src={HomeImage} width='85%'className='home-img'/>
                  </Col>
              </Row>

              <br/>
          </Container>
        );
    }
}