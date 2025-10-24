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
 * - Manages adding new contacts
 * - Handles favorite/starred contacts (sorted first)
 * - Delete with undo functionality
 * - Displays contact insights and analytics
 * - Displays toast notifications
 */
function App() {
  // State Management
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deletedContact, setDeletedContact] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [contactToShow, setContactToShow] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  /**
   * Simulate async API fetch of contacts on component mount
   * Uses setTimeout to mimic network delay
   * Adds isFavorite property to each contact
   */
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      
      // Simulate API call with 1.5 second delay
      setTimeout(() => {
        // Add isFavorite property to each contact (default false)
        const contactsWithFavorites = contactsData.map(contact => ({
          ...contact,
          isFavorite: false
        }));
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
   * Show contact info dialog
   * @param {number} contactId - ID of contact to show info for
   */
  const handleShowInfo = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setContactToShow(contact);
      setShowInfoDialog(true);
    }
  };

  /**
   * Close contact info dialog
   */
  const handleCloseInfo = () => {
    setShowInfoDialog(false);
    setContactToShow(null);
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

  // Calculate favorite count for insights
  const favoriteCount = contacts.filter(c => c.isFavorite).length;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-transparent to-purple-900/10"></div>
      
      {/* Floating Orbs Animation */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-lg animate-glow delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-float delay-2000"></div>
      <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-cyan-500/20 rounded-full blur-xl animate-glow delay-3000"></div>
      
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
            favoriteCount={favoriteCount}
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
          onShowInfo={handleShowInfo}
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

      {/* Contact Info Dialog */}
      {showInfoDialog && contactToShow && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-[9999]"
          onClick={handleCloseInfo}
        >
          <div 
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 max-w-4xl mx-4 shadow-2xl transform animate-scale-in w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseInfo}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contact Avatar and Name */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-2xl">
                  {contactToShow.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl font-bold text-white break-words leading-tight">{contactToShow.name}</h3>
                {contactToShow.isFavorite && (
                  <span className="text-sm text-yellow-400 font-medium">⭐ Favorite</span>
                )}
              </div>
            </div>
            
            {/* Contact Details - Individual Info Boxes */}
            <div className="space-y-4">
              {/* Email Info Box */}
              <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-cyan-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300 font-semibold text-lg">Email</span>
                </div>
                <p className="text-white text-xl break-words pl-9 leading-relaxed">{contactToShow.email}</p>
              </div>

              {/* Phone Info Box */}
              <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300 font-semibold text-lg">Phone</span>
                </div>
                <p className="text-white text-xl break-words pl-9 leading-relaxed">{contactToShow.phone}</p>
              </div>

              {/* Location Info Box */}
              {contactToShow.location && (
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <svg className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-300 font-semibold text-lg">Location</span>
                  </div>
                  <p className="text-white text-xl break-words pl-9 leading-relaxed">{contactToShow.location}</p>
                </div>
              )}

              {/* Address Info Box */}
              {contactToShow.address && (
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <svg className="w-6 h-6 text-orange-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-gray-300 font-semibold text-lg">Address</span>
                  </div>
                  <p className="text-white text-xl break-words pl-9 leading-relaxed">{contactToShow.address}</p>
                </div>
              )}

              {/* Birthday Info Box */}
              {contactToShow.birthday && (
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <svg className="w-6 h-6 text-pink-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300 font-semibold text-lg">Birthday</span>
                  </div>
                  <p className="text-white text-xl pl-9 leading-relaxed">{new Date(contactToShow.birthday).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  handleCloseInfo();
                  handleShowEditForm(contactToShow.id);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Contact
              </button>
              <button
                onClick={handleCloseInfo}
                className="flex-1 px-6 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-colors font-medium text-lg"
              >
                Close
              </button>
            </div>
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
    </div>
  );
}

export default App;

