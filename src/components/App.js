import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import uuidv4 from 'uuidv4';
import AddContact from './AddContact';
import './App.css';
import ContactList from './ContactList';
import Header from './Header';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const retrieved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (retrieved) setContacts(JSON.parse(retrieved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  }

  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route path="/add" element={<AddContact addContactHandler={addContactHandler} navigate={navigate}/>}> </Route>
        <Route exact path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
