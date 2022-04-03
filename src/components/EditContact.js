import React, { Component } from 'react';

export default class EditContact extends Component {
    constructor(props) {
        super(props);
        const { id, name, email } = this.props.location.state;
        this.state = {
            id,
            name,
            email
        };
    }

    updateContact = (e) => {
        e.preventDefault();

        if (this.state.name === "" || this.state.email === "") {
            alert("All values are mandatory");
            return;
        }

        this.props.updateContactHandler(this.state);
        this.setState({ id: "", name: "", email: "" });
        this.props.navigate("/Contact_App");
    }

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.updateContact}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        );
    }
}
