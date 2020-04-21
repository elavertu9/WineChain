import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import './resources/styles/WineListingStyles.css';
import WCTitle from './resources/images/wine-coins/wc-title.png';
import WCBlue from './resources/images/wine-coins/wc-blue.png';
import WCLightBlue from './resources/images/wine-coins/wc-lightblue.png';
import WCRed from './resources/images/wine-coins/wc-red.png';
import WCGreen from './resources/images/wine-coins/wc-green.png';
import Toolbar from './Toolbar';

export default class WineListing extends Component {
    constructor(props) {
        super(props);

        // Need to populate array of existing coins using ABI
        // Used to populate coins on Wine Listing page
        this.state = {
            coins: []
        };
    }

    render() {
        return (
          <Container>
              <Row>
                  <Col className='element-center'>
                      <img alt="WineCoin" src={WCTitle} width='450px'/>
                  </Col>
              </Row>
              <br/>
              <Toolbar/>
              <br/>
              <table>
                  <tr>
                      <td className='listing-data'>
                          <Card className='wc-card'>
                              <img alt="WineCoin" src={WCBlue} className='wc-image'/>
                              <CardBody>
                                  <CardTitle className='center-text'><h4>Screaming Eagle Cabernet 1992</h4></CardTitle>
                                  <CardSubtitle className='center-text'><h5>$500,000</h5></CardSubtitle>
                                  <CardText>Aged is aged in 60% new oak and has an aroma of blackcurrants, a subtle trace of oak and an opaque purple appearance.</CardText>
                                  <button className='btn-wc'>View More</button>
                              </CardBody>
                          </Card>
                      </td>
                      <td className='listing-data'>
                          <Card className='wc-card'>
                              <img alt="WineCoin" src={WCGreen} className='wc-image'/>
                              <CardBody>
                                  <CardTitle className='center-text'><h4>Jeroboam of Chateau Mouton-Rothschild 1945</h4></CardTitle>
                                  <CardSubtitle className='center-text'><h5>$310,000</h5></CardSubtitle>
                                  <CardText>With symbolism on the label indicating the victory of the Allied forces in the Second World War, the wine is said to be one of the best vintages of the last 100 years.</CardText>
                                  <button className='btn-wc'>View More</button>
                              </CardBody>
                          </Card>
                      </td>
                  </tr>


                  <tr>
                      <td className='listing-data'>
                          <Card className='wc-card'>
                              <img alt="WineCoin" src={WCGreen} className='wc-image'/>
                              <CardBody>
                                  <CardTitle className='center-text'><h4>Cheval Blanc 1947</h4></CardTitle>
                                  <CardSubtitle className='center-text'><h5>$305,000</h5></CardSubtitle>
                                  <CardText>Being the recipient of the exclusive Premier Grand Cru Classe (A) rank in the Classification of Saint-Emilion wine in 2012, Chateau Cheval Blanc is well regarded as one of the most prestigious winemakers in the world!</CardText>
                                  <button className='btn-wc'>View More</button>
                              </CardBody>
                          </Card>
                      </td>
                      <td className='listing-data'>
                          <Card className='wc-card'>
                              <img alt="WineCoin" src={WCLightBlue} className='wc-image'/>
                              <CardBody>
                                  <CardTitle className='center-text'><h4>Shipwrecked 1907 Heidsieck</h4></CardTitle>
                                  <CardSubtitle className='center-text'><h5>$275,000</h5></CardSubtitle>
                                  <CardText>In 1916, a ship carrying the wine was torpedoed by a German submarine in the First World War, causing it to sink to the bottom of the ocean for over 80 years. This bottle of wine comes from the 2,000 saved from the wreckage.</CardText>
                                  <button className='btn-wc'>View More</button>
                              </CardBody>
                          </Card>
                      </td>
                  </tr>

                  <tr>
                      <td className='listing-data'>
                          <Card className='wc-card'>
                              <img alt="WineCoin" src={WCRed} className='wc-image'/>
                              <CardBody>
                                  <CardTitle className='center-text'><h4>Chateau Lafite 1869</h4></CardTitle>
                                  <CardSubtitle className='center-text'><h5>$230,000</h5></CardSubtitle>
                                  <CardText>In Asia, the Chateau Lafite 1869 is considered by many to be extremely rare, so bidders are willing to pay big money to secure one of the worlds most expensive wines.</CardText>
                                  <button className='btn-wc'>View More</button>
                              </CardBody>
                          </Card>
                      </td>
                      <td className='listing-data'>
                          <Card className='wc-card'>
                              <img alt="WineCoin" src={WCBlue} className='wc-image'/>
                              <CardBody>
                                  <CardTitle className='center-text'><h4>Chateau Margaux 1787</h4></CardTitle>
                                  <CardSubtitle className='center-text'><h5>$225,000</h5></CardSubtitle>
                                  <CardText>It is said to be the most expensive wine unsold and is thought to be another bottle from Jefferson's collection.</CardText>
                                  <button className='btn-wc'>View More</button>
                              </CardBody>
                          </Card>
                      </td>
                  </tr>
              </table>

              <br/>
          </Container>
        );
    }
}