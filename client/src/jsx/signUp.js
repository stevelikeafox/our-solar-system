import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import '../css/cards.css';




export class Signup extends Component {


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
            cardPosition: ""
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
        fetch('/users', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",

            }
        })

            .then(users => {

                M.toast({
                    html: "User Saved!",
                    classes: "success"
                });

            })
            .catch(err => {
                // console.log(error);
                M.toast({
                    html: `Error: ${err.message}`,
                    classes: 'error'
                });
            });


    }

    render() {
        return (


            <div className="container">

                <div className="row">

                    <div className="col s10 offset-s1">
                        <h1 className="headline">Sign Up</h1>

                        <div className="card z-depth-3">
                            <div className="user-content">
                                <div className="addcardscontainer">
                                    <form className="form" onSubmit={this.handleSubmit}>

                                        <span className="title"> <label className="label">Email</label> </span>

                                        <input
                                            className="input"
                                            type="text"
                                            name="email"

                                            onChange={this.handleChange}
                                        />

                                        <span className="title"> <label className="label">Password</label> </span>

                                        <input
                                            className="input"
                                            type="text"
                                            name="password"

                                            onChange={this.handleChange}
                                        />

                                        <span className="title"> <label className="label">First Name</label> </span>

                                        <input
                                            className="input"
                                            type="text"
                                            name="firstName"

                                            onChange={this.handleChange}
                                        />

                                        <span className="title"> <label className="label">Surname</label> </span>

                                        <input
                                            className="input"
                                            type="text"
                                            name="lastName"

                                            onChange={this.handleChange}
                                        />

                                        <span className="title"> <label className="label">Current Card Position</label> </span>

                                        <input
                                            className="input"
                                            type="text"
                                            name="cardPosition"

                                            onChange={this.handleChange}
                                        />

                                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
                                        </button>

                                    </form>

                                </div>
                            </div></div></div></div></div>
        );
    }
}

export default Signup;