import React, { Component } from "react";
import M from "materialize-css";
import "../css/cards.css";
import "materialize-css/dist/css/materialize.min.css";

export class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      _id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(props) {
    let User = "5d73394c020dc900175d1f32";

    fetch(`/api/v1/users/${User}`)
      .then(res => res.json())
      .then(users =>
        this.setState({
          users
        })
      );
  }

  handleUpdate(users, action, shown) {
    //console.log(formDisplay);

    let clickedUser = users;
    let userId = users._id;
    // console.log(userId);
    let userIdDOM = document.getElementById(userId);
    // console.log(userIdDOM);

    if (userIdDOM.style.display === "none") {
      userIdDOM.style.display = "block";
    } else {
      userIdDOM.style.display = "none";
    }

    this.setState({
      _id: userId,
      email: clickedUser.email,
      password: clickedUser.password,
      firstName: clickedUser.firstName,
      lastName: clickedUser.lastName
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event, state) {
    event.preventDefault();
    let editedUser = this.state._id;
    // console.log(this.state);

    fetch(`/api/v1/users/${editedUser}`, {
      method: "PUT",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 200) {
          M.toast({
            html: "User Updated!",
            classes: "toastSuccess"
          });
          this.props.history.push("/accountDetails");
        }
        if (response.status === 500) {
          throw new Error(
            "Sorry There Was an Error! Check You Have Filled Out All The Fields and Try Again!"
          );
        }
      })
      .catch(error => {
        // console.log(error);
        M.toast({
          html: `Error: ${error.message}`,
          classes: "toastError"
        });
      })
      .then(users => {
        fetch(`/api/v1/users/${editedUser}`)
          .then(res => res.json())
          .then(users =>
            this.setState({
              users
            })
          );

        let userIdDOM = document.getElementById(editedUser);

        if (userIdDOM.style.display === "none") {
          userIdDOM.style.display = "block";
        } else {
          userIdDOM.style.display = "none";
        }

        // makeCall();
      });
  }

  render() {
    var shown = {
      display: this.state.shown ? "block" : "none"
    };

    var hidden = {
      display: this.state.shown ? "none" : "block"
    };

    return (
      <div className="account">
        <div className="container">
          <div className="row">
            <div className="col s6 offset-s3">
              <h1 className="headline card">Account Details</h1>
              {this.state.users.map(users => (
                <div className="card z-depth-3" key={users._id}>
                  <div className="user-content">
                    <ul className="collection">
                      <li className="collection-item avatar">
                        <img
                          src="./img/profileavatar.png"
                          alt=""
                          className="circle"
                        />
                        <span className="title">
                          <label className="label">First Name</label>
                        </span>
                        <p>{users.firstName}</p> <br />
                        <span className="title">
                          <label className="label">Surname</label>
                        </span>
                        <p>{users.lastName}</p>
                        <br />
                        <span className="title">
                          <label className="label">Email Address</label>
                        </span>
                        <p>{users.email}</p>
                        <br />
                        <span className="title">
                          <label className="label">Current Card Position</label>
                        </span>
                        <p>{users.cardPosition}</p>
                        <br />
                        <div style={shown} id={users._id}>
                          <form className="form" onSubmit={this.handleSubmit}>
                            <br />
                            <br />
                            <span className="title">
                              {" "}
                              <label className="label">First Name</label>{" "}
                            </span>

                            <input
                              className="input"
                              type="text"
                              name="firstName"
                              defaultValue={this.state.firstName}
                              onChange={this.handleChange}
                            />

                            <span className="title">
                              {" "}
                              <label className="label">Surname Name</label>{" "}
                            </span>

                            <input
                              className="input"
                              type="text"
                              name="lastName"
                              defaultValue={this.state.lastName}
                              onChange={this.handleChange}
                            />

                            <span className="title">
                              {" "}
                              <label className="label">
                                Card Position
                              </label>{" "}
                            </span>

                            <input
                              className="input"
                              type="text"
                              name="cardPosition"
                              defaultValue={this.state.cardPosition}
                              onChange={this.handleChange}
                            />

                            {/* <span className="title"> <label className="label">Email</label> </span>

                                                    <input
                                                        className="input"
                                                        type="text"
                                                        name="email"
                                                        defaultValue={this.state.email}
                                                        onChange={this.handleChange}
                                                    />

                                                    <span className="title"> <label className="label">Password</label> </span>

                                                    <input
                                                        className="input"
                                                        type="text"
                                                        name="password"

                                                        onChange={this.handleChange}
                                                    /> */}

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
                        <h2 style={hidden} />
                        <a
                          id="editButton"
                          className="btn-floating btn-small waves-effect waves-light blue editButton"
                          onClick={this.handleUpdate.bind(this, users, "edit")}
                        >
                          <i className="material-icons">edit</i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountDetails;
