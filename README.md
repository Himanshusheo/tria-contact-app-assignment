# Contact List App - Tria Assignment

Hey! 👋 This is my take on the Tria contact list assignment. I've built a modern contact management app using React and TailwindCSS that goes beyond the basic requirements. It's got a sleek dark theme, smooth animations, and some cool features I thought would make it more interesting to use.

![React](https://img.shields.io/badge/React-18.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)
![Create React App](https://img.shields.io/badge/Create_React_App-5.x-09D3AC)

## 🚀 Try It Out

[🚀 **Live Demo**](https://tria-contact-app-assignment.vercel.app) - Check it out on Vercel!

*Note: This is a placeholder URL - I'll update it once I deploy it properly*

## ✨ What I Built

### The Basics (Assignment Requirements)
- **View Contacts**: I've got 500 contacts loaded up in a nice card layout
- **Search**: Type in the search bar and it filters contacts instantly
- **Add Contact**: Click the + button to add new contacts with a popup form

### The Cool Stuff (I got a bit carried away 😅)
- **Edit Contacts**: Right-click any contact or use the 3-dots menu to edit
- **Favorites**: Star contacts you like - they'll show up first
- **Delete with Style**: Confirmation dialog with blur effect (looks pretty cool)
- **More Info**: Click "More Info" to see all contact details in a nice popup
- **Dark Theme**: Because dark themes are just better, right?
- **Smooth Animations**: Everything has nice transitions and hover effects
- **Mobile Friendly**: Works great on phones, tablets, and desktop

### Technical Details
- **3-Dots Menu**: Each contact has a menu with edit, favorite, and delete options
- **Smart Validation**: Won't let you add duplicate phone numbers
- **Extended Fields**: Added location, address, and birthday (optional)
- **Text Handling**: Long names and content wrap properly
- **Toast Messages**: You get feedback for every action
- **Loading States**: Shows a spinner while "loading" contacts (it's simulated)
- **Empty States**: Nice messages when there are no contacts or search results

## 🛠️ What I Used

- **React 19.x** with Create React App (the classic choice)
- **TailwindCSS 3.4.1** for styling (I love utility classes!)
- **React Hooks** for state management (useState, useEffect)
- **npm** for package management
- **Webpack** (comes with CRA)

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

## 🚀 How to Run This Thing

### What You Need
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Let's Get Started

1. **Clone this repo**
```bash
git clone https://github.com/Himanshusheo/tria-contact-app-assignment.git
cd tria-contact-app
```

2. **Install the dependencies**
```bash
npm install
```

3. **Start it up**
```bash
npm start
```

It should open in your browser at [http://localhost:3000](http://localhost:3000) - if it doesn't, just go there manually!

### Other Commands You Might Need

```bash
# Build for production (creates a 'build' folder)
npm run build

# Run tests (if you want to)
npm test

# Eject from CRA (don't do this unless you know what you're doing)
npm run eject
```

## 📦 Deploying This Bad Boy

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build and deploy:
```bash
npm run build
vercel --prod
```

### Netlify (Alternative)

1. Build it first:
```bash
npm run build
```

2. Either drag the `build` folder to [Netlify](https://app.netlify.com/drop) or use their CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🎨 Why I Built It This Way

### Component Structure
I went with functional components and hooks because they're just cleaner and more modern. Each component does one thing well - like `ContactCard` just handles displaying a contact, nothing more.

### State Management
I kept it simple with `useState` and `useEffect`. No Redux or Context API because honestly, this app doesn't need that complexity. All the popup states live in the main App component.

### Styling Choices
- **TailwindCSS**: I love how fast you can build UIs with utility classes
- **Dark Theme**: Because it looks cool and is easier on the eyes
- **Custom Animations**: Added some subtle animations to make it feel polished
- **Mobile First**: Built for phones first, then scaled up

### UX Decisions
- **Loading States**: Added a 1.5s delay to simulate real API calls
- **Empty States**: Clear messages when there's no data
- **Form Validation**: Real-time feedback so users know what's wrong
- **Toast Messages**: Feedback for every action
- **Blur Effects**: Modern popup dialogs that look professional

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

## 🎯 How I Nailed the Assignment

### The Must-Haves (Assignment Requirements)
1. **✅ View Contacts**: Got 500 contacts in a nice card layout
2. **✅ Search by Name**: Type and it filters instantly
3. **✅ Add New Contact**: Popup form with validation

### Technical Stuff (Requirements Met)
- **✅ React**: Used React 19.x with Create React App
- **✅ Libraries**: TailwindCSS for styling, some custom animations
- **✅ API Simulation**: Added loading states to make it feel real
- **✅ Browser Support**: Works on all modern browsers

### The Extra Mile (Because I Couldn't Help Myself)
- **✅ Edit Contacts**: Full CRUD - create, read, update, delete
- **✅ Smart Delete**: Confirmation dialog with undo option
- **✅ Favorites**: Star contacts and they show up first
- **✅ More Info**: Detailed popup with all contact info
- **✅ Dark Theme**: Because it looks professional
- **✅ Mobile Ready**: Works great on phones
- **✅ Smart Validation**: Won't let you add duplicates
- **✅ User Feedback**: Toast messages for everything
- **✅ Loading States**: Shows spinner while "fetching" data
- **✅ Empty States**: Nice messages when there's nothing to show

### Why I Made These Choices
- **Dark Theme**: Looks modern and is easier on the eyes
- **Card Layout**: Easy to scan through contacts
- **3-Dots Menu**: Saves space and looks clean
- **Blur Effects**: Makes popups feel modern
- **Smooth Animations**: Everything feels polished
- **Mobile First**: Most people use phones these days

## 🐛 Things I Know About

- **npm audit warnings**: There are some dependency vulnerabilities, but they're just dev dependencies from Create React App. The production build is fine.
- **No backend**: This is client-side only, so data doesn't persist when you refresh the page.
- **Search is basic**: Only searches by name, not email or phone (could be improved).

## 👨‍💻 My Development Process

### **Why I Picked These Tools:**

#### **TailwindCSS**
I love TailwindCSS because you can build UIs super fast. Instead of writing custom CSS, you just add utility classes. It's like having a design system built-in.

#### **Create React App**
I went with CRA instead of Vite because it's the classic choice and I know it well. Vite is faster, but CRA is more stable and has better documentation.

#### **React Hooks**
I used `useState` and `useEffect` instead of Redux because this app doesn't need that complexity. Hooks are perfect for this size project.

### **My Assumptions & Decisions:**

#### **Data Stuff**
- **No Backend**: The assignment said I could hardcode data, so I did. 500 contacts in a JSON file.
- **Client-Side Only**: Data resets when you refresh - that's fine for this demo.

#### **UI/UX Choices**
- **Dark Theme**: Looks more professional and is easier on the eyes
- **Card Layout**: Easy to scan through contacts quickly
- **3-Dots Menu**: Saves space and looks clean
- **Blur Effects**: Makes popups feel modern and polished

#### **Performance Stuff**
- **Real-time Search**: Uses `useEffect` to filter as you type
- **Text Wrapping**: Handles long names and content properly
- **CSS Animations**: Smooth and performant
- **Loading States**: 1.5s delay to simulate real API calls

### **Code Quality**
- **Clean Components**: Each component does one thing well
- **Smart State**: Global state for popups, local state for simple stuff
- **Error Handling**: Form validation and duplicate prevention
- **Accessibility**: Proper HTML and keyboard navigation
- **Mobile First**: Built for phones, then scaled up

## 🤖 About AI Usage

### How I Used AI
I used AI tools pretty extensively for this project - mostly for:
- **Code Generation**: Getting React components and TailwindCSS classes
- **Problem Solving**: When I got stuck on complex UI interactions
- **Code Review**: Getting suggestions for better practices
- **Documentation**: Structuring this README

### What I Learned
Even with AI help, I still had to:
- **Understand the code**: Review and modify everything to match my style
- **Make decisions**: Choose the best approach for each problem
- **Debug issues**: Fix bugs and handle edge cases
- **Design UX**: Decide on the user experience and interactions

### The Result
The final code represents my understanding and coding style. I can explain every part of it and why I made each decision. The AI was a great tool, but the final product is mine.

## 📄 License

This is for the Tria Assignment - feel free to use it for learning purposes!

## 🙋‍♂️ Get in Touch

Questions? Feedback? Just want to chat about code? Hit me up!

---

**Built with ❤️ (and a lot of coffee) using React and TailwindCSS**
