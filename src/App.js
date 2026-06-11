import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. Load contacts from LocalStorage or set empty array
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  // 2. States for form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // 3. State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // 4. Save contacts to LocalStorage whenever contacts state changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // 5. Function to add new contact
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please enter both Name and Phone Number!');
      return;
    }

    const newContact = {
      id: Date.now(),
      name: name,
      phone: phone,
      email: email || 'No Email'
    };

    setContacts([...contacts, newContact]);
    
    // Clear form fields
    setName('');
    setPhone('');
    setEmail('');
  };

  // 6. Function to delete a contact
  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  // 7. Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>📞 Dynamic Contact Book</h1>

      {/* Form to add contacts */}
      <form onSubmit={handleAddContact} className="contact-form">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email Address (Optional)" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Add Contact</button>
      </form>

      <hr />

      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="🔍 Search contacts by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contacts List */}
      <div className="contacts-list">
        <h2>My Contacts ({filteredContacts.length})</h2>
        {filteredContacts.length === 0 ? (
          <p className="no-contacts">No contacts found!</p>
        ) : (
          filteredContacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>📱 {contact.phone}</p>
                <p>📧 {contact.email}</p>
              </div>
              <button onClick={() => handleDelete(contact.id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;