import AddContact from './AddContact';
import './App.css';
import ContactList from './ContactList';
import Header from './Header';

function App() {
  const contacts = [{
    "id": 1,
    "name": "Logan Tothacot",
    "email": "ltothacot0@yahoo.com"
  }, {
    "id": 2,
    "name": "Hale Bellefonte",
    "email": "hbellefonte1@examiner.com"
  }, {
    "id": 3,
    "name": "Saunderson Ebbers",
    "email": "sebbers2@nhs.uk"
  }, {
    "id": 4,
    "name": "Maridel McGeraghty",
    "email": "mmcgeraghty3@foxnews.com"
  }, {
    "id": 5,
    "name": "Godfry Tacey",
    "email": "gtacey4@pcworld.com"
  }, {
    "id": 6,
    "name": "Andrus D'Agostino",
    "email": "adagostino5@comsenz.com"
  }, {
    "id": 7,
    "name": "Fredek Eyam",
    "email": "feyam6@sbwire.com"
  }, {
    "id": 8,
    "name": "Blondy Caldaro",
    "email": "bcaldaro7@ustream.tv"
  }, {
    "id": 9,
    "name": "Ula Fuchs",
    "email": "ufuchs8@addtoany.com"
  }, {
    "id": 10,
    "name": "Sauncho Sebright",
    "email": "ssebright9@diigo.com"
  }];

  return (
    <div className="ui container">
      <Header />
      <AddContact />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
