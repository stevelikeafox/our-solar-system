import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import "../css/cards.css";

// export class AddCards extends Component {

// state = {
//     cards: []
// }

export class AddCards extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  constructor(props) {
    super(props);
    this.state = {
      cardNum: "",
      fact: "",
      cardTitle: "",
      img: "",
      moreInfo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);

    //   console.log('Restult', cards);
    fetch("/api/v1/cards", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      // .then(response => {
      //     // console.log(response.headers.get('Content-Type'))
      //     // console.log(response);
      //     if (response.status === 200) {
      //         M.toast({
      //             html: "Card Created!",
      //             classes: "toastSuccess"

      //         })

      //     };
      //     .then(() => {
      //         this.props.history.push('/cards')
      //     })
      //     if (response.status === 500) {
      //         throw new Error('Sorry There Was an Error!');
      //     }
      // })
      // .catch(error => {
      //     M.toast({
      //         html: `${error.message}`,
      //         classes: 'toastError'
      //     });
      // });

      .then(response => {
        if (response.status === 201) {
          M.toast({
            html: "Card Saved!",
            classes: "toastSuccess"
          });
          this.props.history.push("/cards");
        }
        if (response.status === 500) {
          throw new Error(
            "Sorry There Was an Error! Check You Have Filled Out All The Fields and Try Again!"
          );
        }
      })

      .catch(error => {
        console.log("error", error);
        M.toast({
          html: `${error.message}`,
          classes: "toastError"
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1 className="headline card">Add Cards</h1>

            <div className="card z-depth-3">
              <div className="user-content">
                <div className="addcardscontainer">
                  <form className="form" onSubmit={this.handleSubmit}>
                    <span className="title">
                      {" "}
                      <label className="label">Card Number</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="cardNum"
                      value={this.state.cardNum}
                      onChange={this.handleChange}
                    />

                    <span className="title">
                      {" "}
                      <label className="label">Fact</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="fact"
                      value={this.state.fact}
                      onChange={this.handleChange}
                    />

                    <span className="title">
                      {" "}
                      <label className="label">Card Title</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="cardTitle"
                      value={this.state.cardTitle}
                      onChange={this.handleChange}
                    />

                    <span className="title">
                      {" "}
                      <label className="label">Image Link</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="img"
                      value={this.state.img}
                      onChange={this.handleChange}
                    />

                    <span className="title">
                      {" "}
                      <label className="label">More Infomation</label>{" "}
                    </span>

                    <textarea
                      className="textarea"
                      name="moreInfo"
                      value={this.state.moreInfo}
                      onChange={this.handleChange}
                    />

                    <button
                      className="btn waves-effect waves-light blue"
                      type="submit"
                      name="action"
                    >
                      Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCards;
