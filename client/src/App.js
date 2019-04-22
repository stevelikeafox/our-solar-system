import React, {
  Component
} from 'react';
import './App.css';

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

        {this.state.cards.map(cards =>

          <h1 key={cards._id}> {cards.cards.fact} </h1>)

        }

      </div>
    );
  }
}


export default App;