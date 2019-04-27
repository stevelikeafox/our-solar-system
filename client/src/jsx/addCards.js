import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import '../css/cards.css';


// export class AddCards extends Component {

// state = {
//     cards: []
// }





export class AddCards extends React.Component {

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
        console.log(this.state);

        let cards = (this.state);
        console.log('Restult', cards);
        fetch('/cards', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",

            }
        })

            .then(cards => {
                //this.reset();
                M.toast({
                    html: "Band Saved!",
                    classes: "success"
                });
                //  reloadList();
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

                <form className="form" onSubmit={this.handleSubmit}>

                    <label className="label">Card Number</label>

                    <input
                        className="input"
                        type="text"
                        name="cardNum"
                        value={this.state.cardNum}
                        onChange={this.handleChange}
                    />



                    <label className="label">Fact</label>

                    <input
                        className="input"
                        type="text"
                        name="fact"
                        value={this.state.fact}
                        onChange={this.handleChange}
                    />


                    <label className="label">Card Title</label>

                    <input
                        className="input"
                        type="text"
                        name="cardTitle"
                        value={this.state.cardTitle}
                        onChange={this.handleChange}
                    />



                    <label className="label">Image Link</label>

                    <input
                        className="input"
                        type="text"
                        name="img"
                        value={this.state.img}
                        onChange={this.handleChange}
                    />



                    <label className="label">More Infomation</label>

                    <textarea
                        className="textarea"
                        name="moreInfo"
                        value={this.state.moreInfo}
                        onChange={this.handleChange}
                    />





                    <input
                        type="submit"
                        value="Submit"
                        className="button is-primary"
                    />

                </form>

            </div>

        );
    }
}

export default AddCards;