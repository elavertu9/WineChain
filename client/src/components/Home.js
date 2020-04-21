import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import "./resources/styles/HomeStyles.css";
import HomeImage from './resources/images/wine-bottles.jpeg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Home extends Component {

    render() {
        return (
          <Container>
              <Row>
                  <Col className="element-center">
                      <h1>Welcome to WineChain</h1>
                      <br/>
                      <img alt="Home" src={HomeImage} width='85%'className='home-img'/>
                  </Col>
              </Row>

              <br/>

              <Row>
                  <Col className="element-center">
                      <h5>Check out our WineCoin inventory!</h5>
                      <br/>
                      <button onClick={() => this.navigateTo()} className="button"><FontAwesomeIcon icon="arrow-right" size='3x'/></button>
                  </Col>
              </Row>

              <br/>
          </Container>
        );
    }

    navigateTo() {
        window.location.href="/listing";
    }
}