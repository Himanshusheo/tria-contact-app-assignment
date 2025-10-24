# Troubleshooting Guide

## Common Issues and Solutions

### ✅ FIXED: TailwindCSS PostCSS Error

**Issue**: `Error: It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin`

**Root Cause**: TailwindCSS v4 (which was initially installed) has breaking changes and requires a different PostCSS setup that doesn't work well with Create React App.

**Solution Applied**: 
- Downgraded to TailwindCSS v3.4.1 (stable version)
- Updated `postcss.config.js` to use array syntax with `require()`

**Current Configuration** (verified working):

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
```

**Dependencies**:
- `tailwindcss`: 3.4.1
- `postcss`: 8.4.35
- `autoprefixer`: 10.4.18

---

## Other Potential Issues

### Port Already in Use

**Issue**: Error: Port 3000 is already in use

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or let React suggest another port (it will auto-prompt)
```

### npm install fails

**Issue**: npm cache errors or permission issues

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles not loading after TailwindCSS installation

**Issue**: TailwindCSS classes not being applied

**Solution**:
1. Verify `tailwind.config.js` exists with correct `content` paths
2. Verify `postcss.config.js` exists with correct plugins
3. Ensure `index.css` includes Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Restart dev server

### Build warnings about vulnerabilities

**Issue**: npm audit shows vulnerabilities

**Solution**:
- These are mostly from Create React App dependencies (dev-only)
- They don't affect production build
- To fix (may cause breaking changes):
  ```bash
  npm audit fix
  # Or for aggressive fixes:
  npm audit fix --force
  ```

### Hot Module Replacement not working

**Issue**: Changes not reflecting in browser

**Solution**:
1. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Restart dev server

### Watchpack Error: EMFILE too many open files

**Issue**: File watcher errors on macOS

**Solution**:
```bash
# Increase file watcher limit (macOS)
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
```

Or simply restart the dev server.

---

## Environment Issues

### Node version incompatibility

**Issue**: Errors related to Node.js version

**Solution**:
- Ensure Node.js version 14 or higher
- Check version: `node --version`
- Update if needed: Use nvm or download from nodejs.org

### Missing dependencies

**Issue**: Module not found errors

**Solution**:
```bash
# Reinstall all dependencies
npm install

# Or install specific missing package
npm install <package-name>
```

---

## Build Issues

### Build fails with memory issues

**Issue**: JavaScript heap out of memory

**Solution**:
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Production build not working correctly

**Issue**: Build works locally but not in production

**Solution**:
1. Test production build locally:
   ```bash
   npm run build
   npx serve -s build
   ```
2. Check for environment-specific issues
3. Verify all environment variables are set

---

## Deployment Issues

### Netlify: Build fails

**Solution**:
1. Ensure build command is `npm run build`
2. Ensure publish directory is `build`
3. Check Node version in Netlify settings (should be 18)

### Vercel: Routes not working

**Solution**:
- Vercel auto-detects CRA
- If issues persist, check `vercel.json` configuration

### 404 on page refresh (SPA routing)

**Solution**:
- Ensure hosting platform is configured for SPA
- Netlify: Use `netlify.toml` (already included)
- Vercel: Handled automatically

---

## Performance Issues

### Slow initial load

**Solution**:
- This is normal for development mode
- Production build is much faster
- Test production build: `npm run build && npx serve -s build`

### Large bundle size

**Solution**:
- Analyze bundle: `npm run build`
- Check build output for size warnings
- Consider code splitting if needed (future enhancement)

---

## Contact Search Issues

### Search not working

**Checklist**:
1. Ensure search query state is being updated
2. Check filter logic in `useEffect`
3. Verify case-insensitive comparison
4. Check console for errors

### Add Contact not working

**Checklist**:
1. Fill all required fields
2. Check email format (must include @ and .)
3. Verify form validation logic
4. Check browser console for errors

---

## Getting Help

### Resources
1. **Create React App**: https://create-react-app.dev/docs/troubleshooting
2. **TailwindCSS**: https://tailwindcss.com/docs/installation
3. **React**: https://react.dev/learn

### Debug Steps
1. Check browser console for errors
2. Check terminal for build errors
3. Clear browser cache and restart
4. Delete `node_modules` and reinstall
5. Check this troubleshooting guide

---

## Quick Fixes Checklist

When something goes wrong, try these in order:

- [ ] Hard refresh browser (Cmd/Ctrl + Shift + R)
- [ ] Clear browser console and check for errors
- [ ] Restart development server
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Check Node version: `node --version` (need 14+)
- [ ] Check this troubleshooting guide
- [ ] Check main README.md and SETUP.md

---

**Last Updated**: After fixing TailwindCSS v4 compatibility issue

**Status**: All known issues resolved ✅

