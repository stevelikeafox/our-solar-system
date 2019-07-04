import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import "../css/cards.css";
import { Redirect, Link } from "react-router-dom";

export class Signup extends Component {
  state = {
    redirect: false
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };
  // needs to go into constructor
  componentDidMount() {
    M.AutoInit();
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      cardPosition: 1
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
    console.log(this.state);

    //   console.log('Restult', cards);
    fetch("/signup", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            redirect: true,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            cardPosition: 1
          });
          M.toast({
            html: "User Created!",
            classes: "toastSuccess"
          });
        }
        if (response.status === 400) {
          throw new Error("Please Enter Your Details!");
        }
        if (response.status === 401) {
          throw new Error("Email Address Already Registered!");
        }
      })
      .catch(error => {
        // console.log(error);
        M.toast({
          html: `${error.message}`,
          classes: "toastError"
        });
      });
  }

  render() {
    return (
      <div className="container">
        {this.renderRedirect()}
        <div className="row">
          <div className="col s10 offset-s1">
            <h1 className="headline card">Sign Up</h1>

            <div className="card z-depth-3">
              <div className="user-content">
                <div className="addcardscontainer">
                  <form className="form" onSubmit={this.handleSubmit}>
                    <span className="title">
                      {" "}
                      <label className="label">Email</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                    />

                    <span className="title">
                      {" "}
                      <label className="label">Password</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="password"
                      onChange={this.handleChange}
                    />

                    <span className="title">
                      {" "}
                      <label className="label">First Name</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="firstName"
                      onChange={this.handleChange}
                    />

                    <span className="title">
                      {" "}
                      <label className="label">Surname</label>{" "}
                    </span>

                    <input
                      className="input"
                      type="text"
                      name="lastName"
                      onChange={this.handleChange}
                    />

                    {/* <span className="title"> <label className="label">Current Card Position</label> </span>

                                        <input readOnly
                                            className="input"
                                            type="text"
                                            name="cardPosition"
                                            value={this.state.cardPosition}

                                        /> */}

                    <button
                      className="btn waves-effect waves-light"
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

export default Signup;
