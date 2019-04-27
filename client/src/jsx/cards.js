import React, { Component } from 'react';

import '../css/cards.css';
import 'materialize-css/dist/css/materialize.min.css';


export class Cards extends Component {
  state = {
    cards: []
  }

  componentDidMount() {
    fetch('/cards')
      .then(res => res.json())
      .then(cards => this.setState({
        cards
      }));
  }

  render() {
    return (

      <div className="Cards">


        <div className="container">

          <div className="row">

            <div className="col s6 offset-s3">
              <h1 className="cardsHeadline">CARDS</h1>
              {this.state.cards.map(cards => <div className="card z-depth-3" key={cards._id}>
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={cards.img} alt="Card"></img>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{cards.cardTitle}<i className="material-icons right">more_vert</i></span>
                  <p>{cards.fact}</p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{cards.cardTitle}<i className="material-icons right">close</i></span>
                  <p>{cards.moreInfo}</p>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Cards;