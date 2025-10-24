import React from 'react';
import ContactCard from './ContactCard';

/**
 * ContactList Component
 * 
 * Displays a grid of contact cards or appropriate empty/loading states
 * 
 * @param {Array} contacts - Array of contact objects to display
 * @param {boolean} loading - Loading state flag
 * @param {string} searchQuery - Current search query (for empty state message)
 * @param {function} onToggleFavorite - Callback to toggle favorite status
 * @param {function} onDelete - Callback to delete contact
 * @param {function} onShowInfo - Callback to show contact info
 */
const ContactList = ({ contacts, loading, searchQuery, onToggleFavorite, onDelete, onShowInfo }) => {
  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading contacts...</p>
      </div>
    );
  }

  // Empty State - No Contacts Found
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <svg 
          className="w-24 h-24 text-gray-300 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {searchQuery ? 'No contacts found' : 'No contacts yet'}
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          {searchQuery 
            ? `No contacts match "${searchQuery}". Try a different search term.`
            : 'Add your first contact to get started!'}
        </p>
      </div>
    );
  }

  // Contact Grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id} 
          contact={contact}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
            onShowInfo={onShowInfo}
        />
      ))}
    </div>
  );
};

export default ContactList;

