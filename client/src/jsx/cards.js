import React, { Component } from 'react';

import M from "materialize-css";
import '../css/cards.css';
import 'materialize-css/dist/css/materialize.min.css';


export class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      fact: "",
      cardTitle: "",
      img: "",
      moreInfo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  };

  componentDidMount() {

    fetch('/cards')
      .then(res => res.json())
      .then(cards =>
        this.setState({
          cards,
          fact: "",
          cardTitle: "",
          img: "",
          moreInfo: ""
        }));

    M.AutoInit();
    //function handleClick(index) { console.log(index); }
  };


  handleClick(cards, action, shown) {
    let clickedCard = cards;

    fetch(`/cards/${clickedCard._id}`, {
      method: 'DELETE'
    })
      .then(resp => {
        console.log('resp', resp);
        M.toast({
          html: "Card Deleted!",
          classes: "success"
        });

      })
      .catch(err => {
        console.log('err', err);
        M.toast({
          html: `Error: ${err.message}`,
          classes: "error"
        });
      });


    fetch('/cards')
      .then(res => res.json())
      .then(cards =>
        this.setState({
          cards
        }));
  };



  handleUpdate(cards, action, shown) {

    //console.log(formDisplay);

    let clickedCard = cards;
    let cardId = cards._id;
    console.log(cardId);
    let cardIdDOM = document.getElementById(cardId)
    console.log(cardIdDOM);



    if (cardIdDOM.style.display === "none") {
      cardIdDOM.style.display = "block";
    } else {
      cardIdDOM.style.display = "none";
    };

    this.setState({
      _id: cardId,
      fact: clickedCard.fact,
      cardTitle: clickedCard.cardTitle,
      img: clickedCard.img,
      moreInfo: clickedCard.moreInfo
    });


  };


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;


    this.setState({
      [name]: value
    });
  };
  // the PUT method of the updated data
  handleSubmit(event, state) {

    event.preventDefault();
    let editedCard = this.state._id;
    console.log(this.state._id);

    fetch(`/cards/${editedCard}`, {
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",

      }
    })

      .then(cards => {
        fetch('/api/cards')
          .then(res => res.json())
          .then(cards =>
            this.setState({
              cards,
              fact: "",
              cardTitle: "",
              img: "",
              moreInfo: ""
            }));

        // look into states for changing the display
        let cardIdDOM = document.getElementById(editedCard)

        if (cardIdDOM.style.display === "none") {
          cardIdDOM.style.display = "block";
        } else {
          cardIdDOM.style.display = "none";
        };

        M.toast({
          html: "Card Saved!",
          classes: "success"
        });
        // makeCall();
      })
      .catch(err => {
        // console.log(error);
        M.toast({
          html: `Error: ${err.message}`,
          classes: 'error'
        });
      });



  };






  render() {

    var shown = {
      display: this.state.shown ? "block" : "none"
    };

    var hidden = {
      display: this.state.shown ? "none" : "block"
    };


    return (
      <div>

        <div className="container">

          <div className="row">

            <div className="col s10 offset-s1">
              <h1 className="headline">CARDS</h1>
              {this.state.cards.map(cards => <div className="card z-depth-3" key={cards._id}>
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={cards.img} alt="Card"></img>
                </div>

                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{cards.cardTitle}<i className="material-icons right">more_vert</i></span>
                  <p>{cards.fact}</p>



                  <div style={shown} id={cards._id}>

                    <form className="form" onSubmit={this.handleSubmit}>
                      <br /><br />
                      <span className="title"> <label className="label">Card Title</label> </span>

                      <input
                        className="input"
                        type="text"
                        name="cardTitle"
                        defaultValue={this.state.cardTitle}
                        onChange={this.handleChange}
                      />



                      <span className="title"> <label className="label">Fact</label> </span>

                      <input
                        className="input"
                        type="text"
                        name="fact"
                        defaultValue={this.state.fact}
                        onChange={this.handleChange}
                      />




                      <span className="title"> <label className="label">Image Link</label> </span>

                      <input
                        className="input"
                        type="text"
                        name="img"
                        defaultValue={this.state.img}
                        onChange={this.handleChange}
                      />

                      <span className="title"> <label className="label">More Infomation</label> </span>

                      <textarea
                        className="textarea"
                        name="moreInfo"
                        defaultValue={this.state.moreInfo}
                        onChange={this.handleChange}
                      />

                      <button className="btn waves-effect waves-light blue" type="submit" name="action">Submit
<i className="material-icons right">send</i>
                      </button>

                    </form></div>






                  <h2 style={hidden}></h2>
                  <a id={cards._id} className="btn-floating btn-small waves-effect waves-light blue editButton" onClick={this.handleUpdate.bind(this, cards, "edit")}><i className="material-icons">edit</i></a>
                  <a id="deleteButton" className="btn-floating btn-small waves-effect waves-light red" onClick={this.handleClick.bind(this, cards, "delete")}><i className="material-icons">delete</i></a><br /><br />
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