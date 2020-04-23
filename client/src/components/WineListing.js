import React, {Component} from "react";
import {Container, Row, Col} from 'reactstrap';
import './resources/styles/WineListingStyles.css';
import WCTitle from './resources/images/wine-coins/wc-title.png';
// import WCBlue from './resources/images/wine-coins/wc-blue.png';
// import WCLightBlue from './resources/images/wine-coins/wc-lightblue.png';
// import WCRed from './resources/images/wine-coins/wc-red.png';
// import WCGreen from './resources/images/wine-coins/wc-green.png';
import Toolbar from './Toolbar';
import WineCoin from './WineCoin';

export default class WineListing extends Component {
    constructor(props) {
        super(props);

        // Need to populate array of existing coins using ABI
        // Used to populate coins on Wine Listing page
        this.state = {
            allCoins: [],
        };

        this.generateCards = this.generateCards.bind(this);
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

    generateCards() {

        let coinTable = [];

        for(let i = 0; i < this.state.allCoins.length; i+=2) {
            let rowData = [];
            if(i+1 >= this.state.allCoins.length) {
                rowData.push(<td>{this.state.allCoins[i]}</td>);
            } else {
                rowData.push(<td>{this.state.allCoins[i]}</td>);
                rowData.push(<td>{this.state.allCoins[i + 1]}</td>);
            }
            coinTable.push(<tr>{rowData}</tr>);
        }
        return coinTable;


        // let table = this.state.allCoins.map((coin, index) =>
        //     <tr>
        //         <td className="listing-data" key={index}>{coin}</td>
        //     </tr>
        //
        // );
        // return table;
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

              <Row>
                  <Col>
                      <table>
                          {this.generateCards()}
                      </table>
                  </Col>
              </Row>

              <br/>
          </Container>
        );
    }
}