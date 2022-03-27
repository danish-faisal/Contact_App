import { useEffect, useState } from 'react';
import uuidv4 from 'uuidv4';
import AddContact from './AddContact';
import './App.css';
import ContactList from './ContactList';
import Header from './Header';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const retrieved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (retrieved) setContacts(JSON.parse(retrieved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, {id: uuidv4(), ...contact}]);
  }

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
