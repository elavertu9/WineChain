import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody} from 'reactstrap';
import './resources/styles/AboutStyles.css';
import Lavertu from './resources/images/lavertu.png';

export default class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <br/>
                <Row>
                    <Col className='element-center'>
                        <Card className='about-card' style={{backgroundColor: '#ff5e6c'}}>
                            <CardBody>
                                <img src={Lavertu} width='300px' height='300px' className='pic'/>
                                <h3>Evan Lavertu</h3>
                                <a href='http://www.lavertu.dev'>Website</a>
                                <i className="fas fa-globe"/>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className='element-center'>
                        <Card className='about-card' style={{backgroundColor: '#ff5e6c'}}>
                            <CardBody>
                                <h3>Cody Coleman</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col className='element-center'>
                        <Card className='about-card' style={{backgroundColor: '#ff5e6c'}}>
                            <CardBody>
                                <h3>Brandt Reutimann</h3>
                                <a href='http://www.brandtreutimann.dev'>Website</a>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className='element-center'>
                        <Card className='about-card' style={{backgroundColor: '#ff5e6c'}}>
                            <CardBody>
                                <h3>Kyle Lagerberg</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}