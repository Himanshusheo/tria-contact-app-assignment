import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import contactsData from './data/contacts.json';

/**
 * Main App Component
 * 
 * Manages the entire contact list application:
 * - Fetches contacts from JSON file (simulated async with delay)
 * - Handles search functionality (case-insensitive, real-time filtering)
 * - Displays contacts in a grid layout
 */
function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  /**
   * Simulate async API fetch of contacts on component mount
   * Uses setTimeout to mimic network delay
   */
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      
      // Simulate API call with 1.5 second delay
      setTimeout(() => {
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      }, 1500);
    };

    fetchContacts();
  }, []);

  /**
   * Filter contacts based on search query
   * Triggered whenever searchQuery or contacts array changes
   * Case-insensitive search on contact names
   */
  useEffect(() => {
    let filtered;
    if (searchQuery.trim() === '') {
      filtered = [...contacts];
    } else {
      filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  /**
   * Handle search input changes
   * @param {string} query - Search query string
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
      
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-gray-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Contact List
            </h1>
            <p className="mt-2 text-gray-300">
              Manage your contacts efficiently
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />

        {/* Contact List */}
        <ContactList 
          contacts={filteredContacts}
          loading={loading}
          searchQuery={searchQuery}
        />
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-400 relative z-10">
        <p>Built with React & TailwindCSS</p>
        <p className="text-sm mt-1">Tria Assignment - Contact List App</p>
      </footer>
    </div>
  );
}

export default App;
