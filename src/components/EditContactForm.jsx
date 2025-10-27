import React, { useState, useEffect } from 'react';

/**
 * EditContactForm Component
 * 
 * Form for editing existing contacts
 * Pre-populates with existing contact data
 * Includes validation for all required fields (name, email, phone)
 * 
 * @param {Object} contact - Contact object to edit
 * @param {function} onUpdateContact - Callback function to update contact
 * @param {Array} existingContacts - Array of existing contacts for validation
 * @param {function} onClose - Callback function to close the form
 */
const EditContactForm = ({ contact, onUpdateContact, existingContacts = [], onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    birthday: ''
  });
  const [errors, setErrors] = useState({});

  // Pre-populate form with existing contact data
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        location: contact.location || '',
        address: contact.address || '',
        birthday: contact.birthday || ''
      });
    }
  }, [contact]);

  /**
   * Handle input changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form fields
   * Returns true if all fields are valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      // Check for duplicate phone number (excluding current contact)
      const phoneExists = existingContacts.some(existingContact => 
        existingContact.phone === formData.phone.trim()
      );
      if (phoneExists) {
        newErrors.phone = 'Phone number already exists';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create updated contact object
      const updatedContact = {
        ...contact,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim() || null,
        address: formData.address.trim() || null,
        birthday: formData.birthday || null
      };
      
      // Call parent callback to update contact
      onUpdateContact(updatedContact);
    }
  };

  /**
   * Cancel form and reset
   */
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl p-6 animate-slide-up">
      <h3 className="text-xl font-semibold text-white mb-4">Edit Contact</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-gray-700/50 border text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-gray-700/50 border text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-gray-700/50 border text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              errors.phone ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Location Field */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Enter location (optional)"
          />
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            placeholder="Enter address (optional)"
          />
        </div>

        {/* Birthday Field */}
        <div>
          <label htmlFor="birthday" className="block text-sm font-medium text-gray-300 mb-1">
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Form Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            Update Contact
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-600 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContactForm;
