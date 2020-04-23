import React, {Component} from 'react';
import {Container, Row, Col, Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Input, Label} from 'reactstrap';
import "./resources/styles/AddWineStyles.css";

export default class AddWine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            producer: "",
            varietal: "",
            country: "",
            vintage: 0,
            loading: false
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.updateProducer = this.updateProducer.bind(this);
        this.updateVarietal = this.updateVarietal.bind(this);
        this.updateCountry = this.updateCountry.bind(this);
        this.updateVintage = this.updateVintage.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    formSubmit() {
        this.setLoading();
        let input = {
            producer: this.state.producer,
            varietal: this.state.varietal,
            country: this.state.country,
            vintage: this.state.vintage
        };
        this.props.addWine(input);
    }

    setLoading() {
        this.setState({loading: !this.state.loading});
    }

    updateProducer(event) {
        event.preventDefault();
        this.setState({producer: event.target.value});
    }

    updateVarietal(event) {
        event.preventDefault();
        this.setState({varietal: event.target.value});
    }

    updateCountry(event) {
        event.preventDefault();
        this.setState({country: event.target.value});
    }

    updateVintage(event) {
        event.preventDefault();
        this.setState({vintage: event.target.value});
    }



    render() {
        return(
            <Container>
                <Modal draggable={false} backdrop={'static'} centered={true} isOpen={this.props.isOpen} size='lg' data-backdrop="static">
                    <ModalHeader toggle={this.props.toggle}>Add Wine   {this.state.loading ? <div className="loader"></div> : <div/>}</ModalHeader>
                    <ModalBody>

                        <Form>
                            <FormGroup>
                                <Label for="producer">Producer</Label>
                                <Input type="text" name="producer" id="producer" value={this.state.producer} onChange={(e) => this.updateProducer(e)} placeholder="Producer Name..." required/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="varietal">Varietal</Label>
                                <Input type="text" name="varietal" id="varietal" value={this.state.varietal} onChange={(e) => this.updateVarietal(e)} placeholder="Varietal..." required/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input type="text" name="country" id="country" value={this.state.country} onChange={(e) => this.updateCountry(e)} placeholder="Country..." required/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="vintage">Vintage</Label>
                                <Input type="number" name="vintage" value={this.state.vintage} onChange={(e) => this.updateVintage(e)} id="vintage" placeholder="Year..." multiple/>
                            </FormGroup>

                        </Form>
                        <Button color="success" type="submit" onClick={() => this.formSubmit()}>Submit</Button>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}