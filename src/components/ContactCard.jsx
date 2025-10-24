import React, { useState } from 'react';

/**
 * ContactCard Component
 * 
 * Displays an individual contact's information in a card layout
 * 
 * @param {Object} contact - Contact object containing id, name, email, phone, isFavorite
 * @param {function} onToggleFavorite - Callback to toggle favorite status
 * @param {function} onDelete - Callback to delete contact
 */
const ContactCard = ({ contact, onToggleFavorite, onDelete, onShowInfo }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDeleteClick = () => {
    setShowMenu(false);
    onDelete(contact.id);
  };

  const handleInfoClick = () => {
    setShowMenu(false);
    onShowInfo(contact.id);
  };


  return (
    <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300 animate-slide-up relative">
      {/* 3-Dots Menu Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
        title="More options"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-12 right-4 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 min-w-[180px]">
            {/* More Info Option */}
            <button
              onClick={handleInfoClick}
              className="w-full px-4 py-2 text-left text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>


          {/* Favorites Option */}
          <button
            onClick={() => {
              onToggleFavorite(contact.id);
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left text-yellow-400 hover:bg-gray-600 hover:text-yellow-300 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {contact.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          
          {/* Delete Option */}
          <button
            onClick={handleDeleteClick}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Contact
          </button>
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowMenu(false)}
        />
      )}

      <div className="flex items-center mb-4">
        {/* Avatar with first letter of name */}
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white break-words leading-tight">{contact.name}</h3>
          {contact.isFavorite && (
            <span className="text-xs text-yellow-400 font-medium">Favorite</span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {/* Email */}
        <div className="flex items-start text-gray-300">
          <svg 
            className="w-4 h-4 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-sm break-words min-w-0 flex-1">{contact.email}</span>
        </div>
        
        {/* Phone */}
        <div className="flex items-start text-gray-300">
          <svg 
            className="w-4 h-4 mr-2 text-green-400 flex-shrink-0 mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
            />
          </svg>
          <span className="text-sm break-words min-w-0 flex-1">{contact.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

