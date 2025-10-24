import React from 'react';

/**
 * ContactInsights Component
 * 
 * Displays analytics and insights about the contact list
 * 
 * @param {Array} contacts - All contacts
 * @param {number} favoriteCount - Number of favorited contacts
 */
const ContactInsights = ({ contacts, favoriteCount }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl p-6 mb-8 animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg 
          className="w-6 h-6 text-cyan-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        Contact Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Contacts */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-300 font-medium">Total Contacts</p>
              <p className="text-4xl font-bold text-cyan-400 mt-2">{contacts.length}</p>
            </div>
            <div className="text-5xl">👥</div>
          </div>
        </div>

        {/* Favorite Contacts */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-300 font-medium">Favorites</p>
              <p className="text-4xl font-bold text-yellow-400 mt-2">{favoriteCount}</p>
            </div>
            <div className="text-5xl">⭐</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInsights;

