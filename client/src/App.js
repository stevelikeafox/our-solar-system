import React, { Component } from 'react';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';


class App extends Component {
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
      <div className="App">

        <h1>CARDS</h1>
        <div className="container">
          <div className="row">
            <div className="col s6 offset-s3">

              {this.state.cards.map(cards => <div className="card" key={cards._id}>
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={cards.cards.img}></img>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{cards.cards.fact}<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>{cards.cards.moreInfo}</p>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;