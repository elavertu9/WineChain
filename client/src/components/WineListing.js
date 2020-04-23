import React, {Component} from "react";
import {Container, Row, Col} from 'reactstrap';
import './resources/styles/WineListingStyles.css';
import WCTitle from './resources/images/wine-coins/wc-title.png';
// import WCBlue from './resources/images/wine-coins/wc-blue.png';
// import WCLightBlue from './resources/images/wine-coins/wc-lightblue.png';
// import WCRed from './resources/images/wine-coins/wc-red.png';
// import WCGreen from './resources/images/wine-coins/wc-green.png';
import AddWine from './AddWine';
import Toolbar from './Toolbar';
import WineCoin from './WineCoin';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class WineListing extends Component {
    constructor(props) {
        super(props);

        // Need to populate array of existing coins using ABI
        // Used to populate coins on Wine Listing page
        this.state = {
            allCoins: [],
            addWineModal: false,
            input: {
                producer: "",
                varietal: "",
                country: "",
                vintage: 0
            }
        };

        this.generateCards = this.generateCards.bind(this);
        this.toggleAddWine = this.toggleAddWine.bind(this);
        this.addWine = this.addWine.bind(this);
    }

    componentDidUpdate = async() => {
      //console.log(this.props.WineCoin.methods);
        try {
            let totalSupply = await this.props.WineCoin.methods.totalSupply().call();

            let coinCollection = [];
            for(let i = 0; i < totalSupply; i++) {
                let coin = await this.props.WineCoin.methods.tokenByIndex(i).call();
                let cardData = await this.props.WineCoin.methods.getWineData(coin).call();
                coinCollection.push(
                    <WineCoin
                        producer={cardData.producer}
                        origin={cardData.country_of_origin}
                        varietal={cardData.varietal}
                        vintage={cardData.vintage}
                        isVerified={cardData.verified_originator}
                    />
                );
            }

            this.setState({allCoins: coinCollection});

        } catch(error) {
            console.log(error);
        }
    };

    toggleAddWine() {
        this.setState({addWineModal: !this.state.addWineModal});
    }

    generateCards() {

        let coinTable = [];

        for(let i = 0; i < this.state.allCoins.length; i+=2) {
            let rowData = [];
            if(i+1 >= this.state.allCoins.length) {
                rowData.push(<td key={i}>{this.state.allCoins[i]}</td>);
            } else {
                rowData.push(<td key={i}>{this.state.allCoins[i]}</td>);
                rowData.push(<td key={i + 1}>{this.state.allCoins[i + 1]}</td>);
            }
            coinTable.push(<tr key={i}>{rowData}</tr>);
        }
        return coinTable;
    }

    addWine(newInput) {
        console.log(newInput);
        let clientInput = {
            producer: newInput.producer,
            varietal: newInput.varietal,
            country: newInput.country,
            vintage: newInput.vintage
        };
        this.setState({input: clientInput}, () => {
            let results = this.addWineAPI();
            console.log(results);
        });
    }

    addWineAPI = async() => {
        try {
            console.log(this.state.input);
            await this.props.WineCoin.methods.addWineToChain(this.state.input.producer, this.state.input.varietal, this.state.input.country, this.state.input.vintage).send({from: this.props.address, gas: 500000});
            console.log("Succeeded");
            document.location.href="/listing";
        } catch(error) {
            console.log(error);
        }
    };

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

              <Row>
                  <Col>
                      <button className="btn-add" onClick={() => this.toggleAddWine()}><FontAwesomeIcon icon="plus-square" size='3x'/></button>
                      <AddWine toggle={this.toggleAddWine} updateProducer={this.updateProducer} updateVarietal={this.updateVarietal} updateCountry={this.updateCountry} updateVintage={this.updateVintage} isOpen={this.state.addWineModal} input={this.state.input} addWine={this.addWine}/>
                  </Col>
                  <Col>
                      <table>
                          <tbody>
                          {this.generateCards()}
                          </tbody>
                      </table>
                  </Col>
              </Row>

              <br/>
          </Container>
        );
    }
}