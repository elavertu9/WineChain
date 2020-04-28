import React, {Component} from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import "./resources/styles/Toolbarstyles.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonDropdown: false,
            selected: 'Owner Address',
            searchInput: ''
        };

        this.toggle = this.toggle.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({buttonDropdown: !this.state.buttonDropdown});
    }

    handleDropdown(evt) {
        this.setState({selected: evt.target.value});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const data = new FormData(evt.target);
        console.log(data.get('address'));
        this.setState({searchInput: data.get('address')});
    }

    render() {
        return (
          <Container className="searchForm">
              <br/>
              <Row>
                  <Col xs="3" className="element-center">
                      <Label>
                          <FontAwesomeIcon icon="search" size='3x'/>
                      </Label>
                  </Col>
                  <Col xs="3">
                      <ButtonDropdown isOpen={this.state.buttonDropdown} toggle={() => this.toggle()} className="buttonDropdown">
                        <DropdownToggle caret>
                            {this.state.selected}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value="Coin Address" onClick={(evt) => this.handleDropdown(evt)}>Coin Address</DropdownItem>
                            <DropdownItem value="Owner Address" onClick={(evt) => this.handleDropdown(evt)}>Owner Address</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                  </Col>
                  <Col>
                      <Form onSubmit={this.handleSubmit}>
                          <FormGroup className='element-center'>
                              <Input type="text" name="address" id="searchAddress" placeholder="Address..."/>
                              <br/>
                              <Button type="submit" color="success">Submit</Button>
                          </FormGroup>
                      </Form>
                  </Col>
              </Row>
              <br/>
          </Container>
        );
    }
}