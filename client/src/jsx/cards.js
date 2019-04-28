import React, { Component } from 'react';

import M from "materialize-css";
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

    M.AutoInit();


  }



  render() {
    return (

      <div className="Cards">


        <div className="container">

          <div className="row">

            <div className="col s6 offset-s3">
              <h1 className="headline">CARDS</h1>
              {this.state.cards.map(cards => <div className="card z-depth-3" key={cards._id}>

                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={cards.img} alt="Card"></img>
                </div>

                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{cards.cardTitle}<i className="material-icons right">more_vert</i></span>
                  <p>{cards.fact}</p>
                  <a id="editButton" className="btn-floating btn-small waves-effect waves-light blue"><i className="material-icons">edit</i></a>
                  <a id="deleteButton" className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">delete</i></a><br /><br />
                </div>


                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{cards.cardTitle}<i className="material-icons right">close</i></span>
                  <p>{cards.moreInfo}</p>

                </div>



              </div>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Cards;