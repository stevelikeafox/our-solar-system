import React, { Component } from 'react';

// Import Materialize
import M from "materialize-css";


class NavBar extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (

            <div className="top">
                <nav>
                    <div className="nav-wrapper #29b6f6 light-blue lighten-1">
                        <a href="#!" className="brand-logo title">Our Solar System</a>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#">Cards</a></li>
                            <li><a href="#">NASA</a></li>
                            <li><a href="#">My Account</a></li>
                            <li><a href="#">Add Cards</a></li>
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <li><a href="#">Cards</a></li>
                    <li><a href="#">NASA</a></li>
                    <li><a href="#">My Account</a></li>
                    <li><a href="#">Add Cards</a></li>
                </ul>
            </div>

        )
    }
}

export default NavBar;