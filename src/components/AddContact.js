import React, { Component } from 'react';
// import { useNavigate } from 'react-router-dom';

export default class AddContact extends Component {
    state = {
        name: "",
        email: ""
    }

    addContact = (e) => {
        e.preventDefault();

        if (this.state.name === "" || this.state.email === "") {
            alert("All values are mandatory");
            return;
        }

        this.props.addContactHandler(this.state);
        this.setState({ name: "", email: "" });
        this.props.navigate("/");
    }

    render() {
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.addContact}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
            </div>
        );
    }
}
