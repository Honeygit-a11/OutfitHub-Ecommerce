# TODO: Remove localhost from frontend APIs and use VITE_API_URL

## Steps to Complete

1. **Update frontend/src/config/api.js** ✅
   - Change `const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:7000';` to `const API_BASE = import.meta.env.VITE_API_URL || '';`

2. **Update frontend/src/pages/LoginSignup.jsx** ✅
   - Import API_BASE from '../config/api.js'
   - Replace "http://localhost:7000/api/auth/login" with `${API_BASE}/api/auth/login`
   - Replace "http://localhost:7000/api/auth/signup" with `${API_BASE}/api/auth/signup`

3. **Update frontend/src/components/Admin/Order/Order.jsx** ✅
   - Import API_BASE from '../../../config/api.js'
   - Replace 'http://localhost:7000/api/orders' with `${API_BASE}/api/orders`
   - Replace `http://localhost:7000/api/orders/${id}` with `${API_BASE}/api/orders/${id}` (for PUT and DELETE)

4. **Update frontend/src/components/Admin/Listproduct/Listproduct.jsx** ✅
   - Import API_BASE from '../../../config/api.js'
   - Replace 'http://localhost:7000/api/products/allproducts' with `${API_BASE}/api/products/allproducts`
   - Replace 'http://localhost:7000/api/products/removeproduct' with `${API_BASE}/api/products/removeproduct`

5. **Update frontend/src/components/Admin/GstPage/Gst.jsx** ✅
   - Import API_BASE from '../../../config/api.js'
   - Replace "http://localhost:7000/api/settings/gst" with `${API_BASE}/api/settings/gst` (for GET and POST)
   - Replace "http://localhost:7000/api/settings/coupon" with `${API_BASE}/api/settings/coupon`

6. **Update frontend/src/components/Admin/Dashboard/Dashboard.jsx** ✅
   - Import API_BASE from '../../../config/api.js'
   - Replace "http://localhost:7000/api/dashboard" with `${API_BASE}/api/dashboard`

7. **Update frontend/src/components/Admin/Adminusers/Adminusers.jsx** ✅
   - Import API_BASE from '../../../config/api.js'
   - Replace 'http://localhost:7000/api/users' with `${API_BASE}/api/users`

8. **Update frontend/src/components/Admin/Addproduct/Addproduct.jsx** ✅
   - Import API_BASE from '../../../config/api.js'
   - Replace 'http://localhost:7000/upload' with `${API_BASE}/upload`
   - Replace 'http://localhost:7000/api/products/addproduct' with `${API_BASE}/api/products/addproduct`

9. **Verify changes**
   - Ensure all hardcoded localhost URLs are replaced
   - Test that VITE_API_URL is set appropriately in .env for development/production

## Notes
- If VITE_API_URL is not set, API_BASE will be empty string, making URLs relative (e.g., /api/products/allproducts), which is suitable for same-host deployments.
- For development, set VITE_API_URL=http://localhost:7000 in frontend/.env
- For production, set VITE_API_URL to the production backend URL.
