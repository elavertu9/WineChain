import React, {Component} from 'react';
import WCGreen from "./resources/images/wine-coins/wc-green.png";
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import "./resources/styles/WineCoinStyles.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class WineCoin extends Component {
    // producer
    // varietal -> type of grape
    // country of origin
    // vintage -> year grapes were harvested

    render() {
        return(
            <Card className='wc-card'>
                <img alt="WineCoin" src={WCGreen} className='wc-image'/>
                <CardBody>
                    {this.props.isVerified ? <FontAwesomeIcon icon="user-check" size='2x'/>
                    : <p/>}
                    <CardTitle className='center-text'><h4>
                        {this.props.producer}
                    </h4></CardTitle>
                    <CardSubtitle className='center-text'><h5>{this.props.origin}</h5></CardSubtitle>
                    <CardText><strong>Varietal: </strong>{this.props.varietal}</CardText>
                    <CardText><strong>Vintage: </strong>{this.props.vintage}</CardText>
                    <button className='btn-wc' onClick={() => console.log("Button Clicked")}>View More</button>
                </CardBody>
            </Card>
        );
    }
}