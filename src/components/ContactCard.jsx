import React from 'react';

/**
 * ContactCard Component
 * 
 * Displays an individual contact's information in a card layout
 * 
 * @param {Object} contact - Contact object containing id, name, email, phone, isFavorite
 * @param {function} onToggleFavorite - Callback to toggle favorite status
 * @param {function} onDelete - Callback to delete contact
 * @param {function} onEdit - Callback to edit contact
 */
const ContactCard = ({ contact, onToggleFavorite, onDelete, onEdit }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300 relative">
      {/* Favorite Star Button */}
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(contact.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition-colors p-1"
          title={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-6 h-6" fill={contact.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      )}

      <div className="flex items-center mb-4">
        {/* Avatar with first letter of name */}
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white break-words leading-tight">{contact.name}</h3>
          {contact.isFavorite && (
            <span className="text-xs text-yellow-400 font-medium">⭐ Favorite</span>
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

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2">
        <button
          onClick={() => onEdit && onEdit(contact.id)}
          className="flex-1 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete && onDelete(contact.id)}
          className="flex-1 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
