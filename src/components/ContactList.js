import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const inputEl = useRef();

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler} />
    ));

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui fluid icon input">
                    <input ref={inputEl} className="prompt" type="text" placeholder="Search Contacts" value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : "No contacts found"}
            </div>
        </div>
    );
}

export default ContactList;