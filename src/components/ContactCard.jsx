import React from 'react';

/**
 * ContactCard Component
 * 
 * Displays an individual contact's information in a card layout
 * 
 * @param {Object} contact - Contact object containing id, name, email, phone
 */
const ContactCard = ({ contact }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-4">
        {/* Avatar with first letter of name */}
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white break-words leading-tight">{contact.name}</h3>
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
