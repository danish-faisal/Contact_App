import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler} />
    ));

    return (
        <div className="main">
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>
    );
}

export default ContactList;