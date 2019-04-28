import React, { Component } from 'react';

import '../css/cards.css';
import 'materialize-css/dist/css/materialize.min.css';


export class AccountDetails extends Component {
    state = {
        users: []
    }

    componentDidMount() {

        let User = "5cc49256991d1a4d882442e5";

        fetch(`/users/${User}`)
            .then(res => res.json())
            .then(users => this.setState({
                users
            }));
    }

    render() {
        return (

            <div className="account">


                <div className="container">

                    <div className="row">

                        <div className="col s10 offset-s1">
                            <h1 className="headline">Account Details</h1>
                            {this.state.users.map(users => <div className="card z-depth-3" key={users._id}>
                                <div className="user-content">
                                    <ul class="collection">
                                        <li class="collection-item avatar">
                                            <img src="./img/profileavatar.png" alt="" class="circle"></img>
                                            <span className="title"><label className="label">First Name</label></span>
                                            <p>{users.firstName}</p> <br />
                                            <span className="title"><label className="label">Surname</label></span>
                                            <p>{users.lastName}</p><br />
                                            <span className="title"><label className="label">Email Address</label></span>
                                            <p>{users.email}</p><br />
                                            <span className="title"><label className="label">Current Card Position</label></span>
                                            <p>{users.cardPosition}</p><br />
                                            <a id="editButton" class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">edit</i></a>

                                        </li>
                                    </ul>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


export default AccountDetails;