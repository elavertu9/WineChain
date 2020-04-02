import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, Label} from 'reactstrap';
import './resources/styles/AboutStyles.css';
import Lavertu from './resources/images/lavertu.png';
import Coleman from './resources/images/cody.png';
import Reutimann from './resources/images/brandt.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                                <Label>
                                    <a href='https://cs.colostate.edu/~elavertu'>
                                        <FontAwesomeIcon icon="globe" size='3x'/>
                                    </a>
                                </Label>
                                <p>
                                    Evan Lavertu is currently pursuing a degree in Computer Science at Colorado State University (CSU).
                                    He currently works for Engineering Network Services at CSU providing technical support to the College of Engineering.
                                    Evan is eager to enter the field of Computer Science, with interest in Cyber Security and Software Development.
                                    In his free time he enjoys playing video games and spending time with his dog, Sudo.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className='element-center'>
                        <Card className='about-card' style={{backgroundColor: '#ff5e6c'}}>
                            <CardBody>
                                <img src={Coleman} width='300px' height='300px' className='pic'/>
                                <h3>Cody Coleman</h3>
                                <br/>
                                <p>
                                    Cody Coleman is a Junior at Colorado State University and working on
                                    completing his degree in Computer Science (CS). Interests in the field of
                                    CS include Cyber Security, CryptoCurrency, and Distributed Systems.
                                    He is also a member of the Colorado Air National Guard as a maintainer
                                    on the F-16 Fighting Falcons. His hobbies include snowboarding, basketball,
                                    volleyball, and spending time with his fiance Kathryn, and pup Jett.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col className='element-center'>
                        <Card className='about-card' style={{backgroundColor: '#ff5e6c'}}>
                            <CardBody>
                                <img src={Reutimann} width='300px' height='300px' className='pic'/>
                                <h3>Brandt Reutimann</h3>
                                <Label>
                                    <a href='http://www.brandtreutimann.dev'>
                                        <FontAwesomeIcon icon="globe" size='3x'/>
                                    </a>
                                </Label>
                                <p>
                                    Brandt Reutimann is a Computer Science Master's student in his final semester. Brandt is on the job hunt looking for positions
                                    in full-stack, big data, or blockchain development.
                                    His current reseach is focused on the cyber-security of industrial control systems (ICS).
                                    Predominately his work centers around high-fidelity simulation of supervisory control and data acquisition systems (SCADA)
                                    for cyber-security and functional safety testing. His hope is through this research we are able identify early vulnerabilites
                                    in the network protocols, system architectures and feedback loops which are central to control system infrastructures.
                                    By identifying these problems early we can anticipate attacks, and develop countermeasures in a safe iterative fashion.
                                </p>
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
                <br/>
            </Container>
        )
    }
}