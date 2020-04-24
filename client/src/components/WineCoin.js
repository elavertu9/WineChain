import React, { Component, Fragment } from "react";
import WCGreen from './resources/images/wine-coins/wc-green.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class WineCoin extends Component {
    render() {
        return (

            <Fragment>
                <div className="col-sm-6 col-md-4 country-card">
                    <div className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
                        <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">

                            <div className="row">
                                <div className="col">
                                    <div className="image-div">
                                        <img
                                            src={WCGreen}
                                            width="30%"
                                            height="30%"
                                            alt="WineCoin"
                                            className="wc-image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col">
                            {this.props.isVerified ? <FontAwesomeIcon icon="user-check" size="2x"/>
                                : <p/>}
                            <div className="text-div">
                                <span className="country-name text-dark d-block font-weight-bold">
                                        {this.props.producer}
                                </span>
                                <span className="country-region text-secondary text-uppercase">
                                        {this.props.country}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}


export default WineCoin;
