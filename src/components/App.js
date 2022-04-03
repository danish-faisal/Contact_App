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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    }));
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  }

  const searchHandler = (searchText) => {
    setSearchTerm(searchText);
    if (searchText != "") {
      const newContactsList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchText.toLowerCase());
      });
      setSearchResults(newContactsList);
    } else {
      setSearchResults(contacts);
    }
  }

  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route exact path="/Contact_App" element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />}> </Route>
        <Route path="/Contact_App/add" element={<AddContact addContactHandler={addContactHandler} navigate={navigate} />}> </Route>
        <Route path="/Contact_App/edit" element={<EditContact updateContactHandler={updateContactHandler} navigate={navigate} location={location} />}> </Route>
        <Route path="/Contact_App/contact/:id" element={<ContactDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
