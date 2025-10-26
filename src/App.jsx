import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import AddContactForm from './components/AddContactForm';
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
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showAddForm, setShowAddForm] = useState(false);

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

  /**
   * Add new contact to the contacts list
   * @param {Object} newContact - New contact object to add
   */
  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [newContact, ...prevContacts]);
    showToast(`✓ ${newContact.name} added successfully!`, 'success');
  };

  /**
   * Show add contact form
   */
  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  /**
   * Close add contact form
   */
  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  /**
   * Display toast notification
   * @param {string} message - Toast message to display
   * @param {string} type - Type of toast (success or delete)
   */
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    
    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 5000);
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
        {/* Add Contact Button */}
        <div className="mb-8">
          <button
            onClick={handleShowAddForm}
            className="w-full max-w-md mx-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg backdrop-blur-sm"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Add New Contact
          </button>
        </div>

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

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-lg animate-slide-up flex items-center gap-3 z-[10000] ${
          toast.type === 'delete' 
            ? 'bg-orange-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Add Contact Form Popup */}
      {showAddForm && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-[9999]"
          onClick={handleCloseAddForm}
        >
          <div 
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl transform animate-scale-in w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseAddForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Add New Contact</h2>
            <AddContactForm 
              onAddContact={handleAddContact} 
              existingContacts={contacts}
              onClose={handleCloseAddForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
