import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import uuidv4 from 'uuidv4';
import api from "../api/contacts";
import AddContact from './AddContact';
import './App.css';
import ContactDetail from './ContactDetail';
import ContactList from './ContactList';
import EditContact from './EditContact';
import Header from './Header';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = () => { }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  }

  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route exact path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}> </Route>
        <Route path="/add" element={<AddContact addContactHandler={addContactHandler} navigate={navigate} />}> </Route>
        <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler} navigate={navigate} location={location} />}> </Route>
        <Route path="/contact/:id" element={<ContactDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
