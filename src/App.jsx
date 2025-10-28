import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import AddContactForm from './components/AddContactForm';
import EditContactForm from './components/EditContactForm';
import ContactInsights from './components/ContactInsights';
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
  const [showEditForm, setShowEditForm] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [deletedContact, setDeletedContact] = useState(null);

  /**
   * Simulate async API fetch of contacts on component mount
   * Uses setTimeout to mimic network delay
   */
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      
      // Simulate API call with 1.5 second delay
      // Add isFavorite property to each contact (default false)
      const contactsWithFavorites = contactsData.map(contact => ({
        ...contact,
        isFavorite: false
      }));
      setTimeout(() => {
        setContacts(contactsWithFavorites);
        setFilteredContacts(contactsWithFavorites);
        setLoading(false);
      }, 1500);
    };

    fetchContacts();
  }, []);

  /**
   * Filter contacts based on search query and sort by favorites
   * Triggered whenever searchQuery or contacts array changes
   * Case-insensitive search on contact names
   * Favorites are always displayed first
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
    
    // Sort: Favorites first, then alphabetically
    const sorted = filtered.sort((a, b) => {
      // Favorites come first
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      // Within same favorite status, sort alphabetically
      return a.name.localeCompare(b.name);
    });
    
    setFilteredContacts(sorted);
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
    const contactWithFavorite = { ...newContact, isFavorite: false };
    setContacts((prevContacts) => [contactWithFavorite, ...prevContacts]);
    showToast(`✓ ${newContact.name} added successfully!`, 'success');
  };

  /**
   * Toggle favorite status of a contact
   * @param {number} contactId - ID of contact to toggle
   */
  const handleToggleFavorite = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
    
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      const action = contact.isFavorite ? 'removed from' : 'added to';
      showToast(`${contact.name} ${action} favorites`, 'success');
    }
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
   * Show delete confirmation dialog
   * @param {number} contactId - ID of contact to delete
   */
  const handleDeleteContact = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setContactToDelete(contact);
      setShowConfirmDialog(true);
    }
  };

  /**
   * Confirm delete contact
   */
  const handleConfirmDelete = () => {
    if (contactToDelete) {
      setDeletedContact(contactToDelete);
      setContacts((prevContacts) => prevContacts.filter(c => c.id !== contactToDelete.id));
      showToast(`${contactToDelete.name} deleted — Undo?`, 'delete');
      setShowConfirmDialog(false);
      setContactToDelete(null);
    }
  };

  /**
   * Cancel delete contact
   */
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setContactToDelete(null);
  };

  /**
   * Undo the last delete action
   */
  const handleUndoDelete = () => {
    if (deletedContact) {
      setContacts((prevContacts) => [...prevContacts, deletedContact]);
      showToast(`${deletedContact.name} restored!`, 'success');
      setDeletedContact(null);
    }
  };

  /**
   * Show edit contact form
   * @param {number} contactId - ID of contact to edit
   */
  const handleShowEditForm = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setContactToEdit(contact);
      setShowEditForm(true);
    }
  };

  /**
   * Close edit contact form
   */
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setContactToEdit(null);
  };

  /**
   * Update existing contact
   * @param {Object} updatedContact - Updated contact object
   */
  const handleUpdateContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    showToast(`✓ ${updatedContact.name} updated successfully!`, 'success');
    handleCloseEditForm();
  };

  /**
   * Display toast notification
   * @param {string} message - Toast message to display
   * @param {string} type - Type of toast (success or delete)
   */
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    
    // Auto-hide toast after 5 seconds (longer for delete to allow undo)
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
      // Clear deleted contact after toast disappears
      if (type === 'delete') {
        setDeletedContact(null);
      }
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
        {/* Contact Insights (shown when not loading) */}
        {!loading && (
          <ContactInsights 
            contacts={contacts}
            favoriteCount={contacts.filter(c => c.isFavorite).length}
          />
        )}

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
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteContact}
          onEdit={handleShowEditForm}
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
          
          {/* Undo Button (only for delete toasts) */}
          {toast.type === 'delete' && deletedContact && (
            <button
              onClick={handleUndoDelete}
              className="ml-2 px-3 py-1 bg-white text-orange-600 rounded font-semibold hover:bg-orange-50 transition-colors"
            >
              UNDO
            </button>
          )}
        </div>
      )}

      {/* Global Confirmation Dialog */}
      {showConfirmDialog && contactToDelete && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-[9999]"
          onClick={handleCancelDelete}
        >
          <div 
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 max-w-lg mx-4 shadow-2xl transform animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCancelDelete}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Delete Contact</h3>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-4 mb-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-white">{contactToDelete.name}</span>?
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-6 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-colors font-medium text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Form Popup */}
      {showEditForm && contactToEdit && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-[9999]"
          onClick={handleCloseEditForm}
        >
          <div 
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl transform animate-scale-in w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseEditForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Edit Contact</h2>
            <EditContactForm 
              contact={contactToEdit}
              onUpdateContact={handleUpdateContact} 
              existingContacts={contacts.filter(c => c.id !== contactToEdit.id)}
              onClose={handleCloseEditForm}
            />
          </div>
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
