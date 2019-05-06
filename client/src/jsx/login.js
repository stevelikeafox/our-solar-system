import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import '../css/cards.css';




export class Login extends Component {


    // needs to go into constructor
    componentDidMount() {

        M.AutoInit();

    }


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.state);

        fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            }
        })

            .then(response => {
                console.log(response.headers.get('Content-Type'))
                console.log(response);
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
                        <h1 className="headline">Login</h1>

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
                                            type="password"
                                            name="password"

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

export default Login;