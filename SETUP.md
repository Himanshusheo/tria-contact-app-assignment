# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd tria-contact-app
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

### Step 3: Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 📱 What to Expect

When you run the app, you'll see:

1. **Loading Screen** (1.5 seconds) - Simulates fetching data from an API
2. **Contact List** - 12 sample contacts displayed in a responsive grid
3. **Search Bar** - Try typing any name to filter contacts in real-time
4. **Add Contact Button** - Click to add a new contact with the form

---

## 🎯 Testing the Features

### Test Search Functionality
1. Type "Alice" in the search bar
2. You should see only "Alice Johnson"
3. Clear the search to see all contacts again

### Test Add Contact
1. Click "Add New Contact" button
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: +1 (555) 999-8888
3. Click "Add Contact"
4. You'll see a success toast and John Doe at the top of the list

### Test Responsive Design
1. Resize your browser window
2. Notice how the grid adapts:
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns

---

## 🔧 Troubleshooting

### Issue: `npm install` fails
**Solution**: Try clearing npm cache
```bash
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use
**Solution**: Either:
- Kill the process using port 3000
- Or the app will prompt you to use a different port (usually 3001)

### Issue: TailwindCSS styles not loading
**Solution**: Make sure `tailwind.config.js` and `postcss.config.js` exist in the root

### Issue: Build warnings about vulnerabilities
**Solution**: These are from Create React App dependencies (dev only)
```bash
# To see details:
npm audit

# To fix (may cause breaking changes):
npm audit fix
```

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 📦 Project Size

- **Development**: ~300MB (with node_modules)
- **Production Build**: ~200KB (gzipped)

---

## ⚡ Performance

- **First Load**: ~1.5s (includes simulated API delay)
- **Search**: Instant (real-time filtering)
- **Add Contact**: Instant (client-side only)

---

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js` to change colors:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Change Loading Delay
Edit `src/App.jsx`:
```js
setTimeout(() => {
  setContacts(contactsData);
  setFilteredContacts(contactsData);
  setLoading(false);
}, 1500); // Change this value (in milliseconds)
```

### Add More Sample Contacts
Edit `src/data/contacts.json` and add more contact objects.

---

## 📚 Learn More

- [Create React App Documentation](https://create-react-app.dev/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

**Happy Coding! 🎉**

