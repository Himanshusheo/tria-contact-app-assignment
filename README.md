# Contact List Application - Tria Assignment

A modern, responsive contact list application built with React and TailwindCSS. This app demonstrates clean component architecture, state management, and excellent UX design patterns with advanced contact management features.

![React](https://img.shields.io/badge/React-18.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)
![Create React App](https://img.shields.io/badge/Create_React_App-5.x-09D3AC)

## 🚀 Live Demo

[Deploy Link - Add your Vercel/Netlify URL here after deployment]

## ✨ Features

### Core Features
- ✅ **View Contacts**: Display 500 contacts in a beautiful card-based grid layout
- 🔍 **Real-time Search**: Instant, case-insensitive search filtering by name
- ➕ **Add Contacts**: Add new contacts with a clean, validated form (popup with blurred background)
- ✏️ **Edit Contacts**: Edit existing contacts with pre-populated form data
- ⭐ **Favorite Contacts**: Star contacts to mark as favorites (sorted first)
- 🗑️ **Delete with Confirmation**: Delete contacts with centered confirmation dialog
- ℹ️ **More Info**: Detailed contact information in a beautiful popup dialog
- 📊 **Contact Insights**: Dashboard showing stats and analytics
- 📱 **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- ⚡ **Loading States**: Simulated async data fetching with loading indicators
- 🎨 **Modern UI**: Clean, minimalist design with smooth animations

### Advanced Features
- 🎯 **3-Dots Menu**: Context menu for each contact with multiple options
- 🔔 **Toast Notifications**: High z-index notifications for all actions
- 🎭 **Blurred Backgrounds**: Modern popup dialogs with backdrop blur effects
- 📝 **Extended Contact Fields**: Location, address, and birthday fields
- 🔒 **Duplicate Prevention**: Prevents adding contacts with same phone number
- 📱 **Long Text Handling**: Proper text wrapping for long names and content
- 🎨 **Dark Theme**: Beautiful black background with animated effects
- 📊 **Individual Info Boxes**: Horizontal layout for contact details

### UX Enhancements
- 🎯 Empty state handling (no contacts / no search results)
- 🔔 Toast notifications for all actions (add, favorite, delete, edit)
- 🧹 Form validation with helpful error messages
- 💫 Smooth animations and transitions
- 🎨 Gradient backgrounds and modern card designs
- 🔄 Clear search button for easy reset
- ⭐ Visual indicators for favorited contacts
- 📈 Real-time contact statistics
- 🎭 Centered popup dialogs with blurred backgrounds
- 📝 Form validation for duplicate phone numbers

## 🛠️ Tech Stack

- **Framework**: React 19.x (Create React App)
- **Styling**: TailwindCSS 3.4.1 (stable version, fully compatible with CRA)
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Webpack (via CRA)
- **Package Manager**: npm

## 📁 Project Structure

```
tria-contact-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── ContactCard.jsx      # Individual contact card with 3-dots menu
│   │   ├── ContactList.jsx      # Contact list container with grid layout
│   │   ├── SearchBar.jsx        # Search input with real-time filtering
│   │   ├── AddContactForm.jsx   # Form to add new contacts (popup)
│   │   ├── EditContactForm.jsx  # Form to edit existing contacts (popup)
│   │   └── ContactInsights.jsx  # Analytics dashboard component
│   ├── data/
│   │   └── contacts.json        # 500 sample contacts with extended data
│   ├── App.jsx                  # Main app with global state & popup management
│   ├── index.js                 # React entry point
│   └── index.css                # TailwindCSS configuration and custom animations
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
```bash
cd tria-contact-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will automatically open in your browser at [http://localhost:3000](http://localhost:3000)

### Other Available Scripts

```bash
# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

## 📦 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `build` folder to [Netlify](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🎨 Design Decisions

### Component Architecture
- **Functional Components**: Used functional components with hooks for modern React best practices
- **Single Responsibility**: Each component has a clear, focused purpose
- **Props-based Communication**: Parent-to-child data flow via props, child-to-parent via callbacks
- **Reusable Components**: Components like `ContactCard` are reusable and self-contained
- **Global State Management**: Centralized popup and dialog state in App.jsx

### State Management
- **Local State**: Used `useState` for simple, component-level state
- **Global State**: Centralized management for popups, dialogs, and confirmations
- **No Redux/Context**: Kept state management simple as required
- **Derived State**: Search filtering computed in `useEffect` for efficiency

### Styling Approach
- **TailwindCSS**: Utility-first approach for rapid, consistent styling
- **Custom Animations**: Added custom keyframe animations (float, glow, scale-in, fade-in)
- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Dark Theme**: Black background with animated gradient effects
- **Blur Effects**: Modern backdrop-blur for popup dialogs

### UX Features
- **Loading States**: 1.5s simulated fetch to demonstrate async handling
- **Empty States**: Clear messaging when no contacts exist or match search
- **Form Validation**: Real-time validation with helpful error messages
- **Toast Notifications**: High z-index notifications for better visibility
- **Smooth Transitions**: CSS transitions for better user experience
- **Popup Dialogs**: Centered dialogs with blurred backgrounds
- **3-Dots Menu**: Context menu for contact actions

## 🔧 Technical Highlights

### Global State Management
```javascript
// Centralized state for all popups and dialogs
const [showConfirmDialog, setShowConfirmDialog] = useState(false);
const [showInfoDialog, setShowInfoDialog] = useState(false);
const [showAddForm, setShowAddForm] = useState(false);
const [showEditForm, setShowEditForm] = useState(false);
```

### 3-Dots Menu Implementation
```javascript
// Context menu with multiple options
const [showMenu, setShowMenu] = useState(false);

const handleDeleteClick = () => {
  setShowMenu(false);
  onDelete(contact.id);
};
```

### Extended Contact Data Structure
```javascript
// Contact object with optional fields
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1 555 0123",
  "location": "New York, USA",        // Optional
  "address": "123 Main St, NY 10001", // Optional
  "birthday": "1990-01-15"           // Optional
}
```

### Duplicate Phone Number Validation
```javascript
// Prevents adding contacts with existing phone numbers
const validateForm = () => {
  const isDuplicate = existingContacts.some(
    contact => contact.phone === formData.phone.trim()
  );
  if (isDuplicate) {
    setError('A contact with this phone number already exists');
    return false;
  }
  return true;
};
```

### Long Text Handling
```javascript
// Proper text wrapping for long content
<h3 className="text-lg font-semibold text-white break-words leading-tight">
  {contact.name}
</h3>
```

## 📊 Contact Data

### Dataset Overview
- **Total Contacts**: 500 contacts
- **Data Fields**: Name, email, phone (required), location, address, birthday (optional)
- **Geographic Coverage**: Various US cities and states
- **Data Quality**: Realistic names, emails, and addresses
- **Optional Fields**: Many contacts have location, address, and birthday data

### Contact Distribution
- **Required Fields**: All 500 contacts have name, email, and phone
- **Optional Fields**: ~80% have location, ~60% have address, ~70% have birthday
- **Geographic Spread**: Contacts from 50+ different US cities
- **Phone Numbers**: Unique phone numbers for all contacts

## 📝 Assumptions & Limitations

### Assumptions
- Contacts are identified by unique IDs
- Email format validation is basic (regex-based)
- Phone numbers must be unique across all contacts
- Data persistence is client-side only (no backend)
- Optional fields (location, address, birthday) are not required

### Limitations
- No actual backend/database integration
- No persistent storage (data resets on page refresh)
- Search only filters by name (not email/phone)
- Toast notifications auto-dismiss after 5 seconds
- Contact insights update in real-time (no historical data)
- No bulk operations (delete multiple, favorite multiple)

## 🎯 Future Enhancements

**Already Implemented:**
- ✅ Delete contact functionality with confirmation dialog
- ✅ Favorite/starred contacts (sorted first)
- ✅ Contact insights and analytics
- ✅ Edit contact functionality
- ✅ More Info dialog with detailed contact information
- ✅ 3-dots menu for contact actions
- ✅ Extended contact fields (location, address, birthday)
- ✅ Duplicate phone number prevention
- ✅ Long text handling and proper wrapping
- ✅ Dark theme with animated background
- ✅ Blurred background popups

**Potential Future Additions:**
- Multiple search fields (email, phone)
- Contact categories/groups
- Import/export contacts (CSV)
- Backend API integration
- LocalStorage persistence
- Contact avatars/photos (currently using initials)
- Advanced filtering options
- Pagination for large contact lists
- Bulk operations (delete multiple, favorite multiple)
- Contact sharing functionality
- Advanced analytics and reporting

## 🐛 Known Issues

- Minor: npm audit shows some vulnerabilities in dependencies (inherited from Create React App)
  - These are development dependencies and don't affect production build
  - Can be addressed by migrating to a more modern build tool in future

## 👨‍💻 Development Notes

### Why Create React App?
- As requested, avoided Vite for this assignment
- CRA provides a stable, webpack-based setup
- Industry-standard for React applications
- Zero configuration required

### Code Quality
- Well-commented code explaining component logic
- Consistent naming conventions
- Proper prop handling and validation
- Clean separation of concerns
- Global state management for complex UI interactions

### Performance Considerations
- 500 contacts provide good test data for performance
- Efficient search filtering with useEffect
- Proper text wrapping for long content
- Optimized animations and transitions

## 📄 License

This project is created for the Tria Assignment and is available for educational purposes.

## 🙋‍♂️ Contact

For questions or feedback about this project, please reach out!

---

**Built with ❤️ using React and TailwindCSS**