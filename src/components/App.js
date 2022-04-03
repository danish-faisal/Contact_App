import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import uuidv4 from 'uuidv4';
import api from "../api/contacts";
import AddContact from './AddContact';
import './App.css';
import ContactDetail from './ContactDetail';
import ContactList from './ContactList';
import Header from './Header';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  useEffect(() => {
    // const retrieved = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if (retrieved) setContacts(JSON.parse(retrieved));
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    }

    getAllContacts();
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
        <Route path="/add" element={<AddContact addContactHandler={addContactHandler} navigate={navigate} />}> </Route>
        <Route exact path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}> </Route>
        <Route path="/contact/:id" element={<ContactDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
