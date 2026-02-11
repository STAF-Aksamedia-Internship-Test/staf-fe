<div align="center">

# STAF - Systematic Talent & Administration Framework

**STAF** adalah aplikasi web modern untuk manajemen karyawan  
yang dibangun dengan **React**, **Tailwind CSS**, dan **Vite**.

**Click here for Live Web:**

https://staf-eight.vercel.app  

 **Default Credentials:** `admin` / `pastibisa`

</div>



## 📋 Daftar Isi

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Cloudinary Image Upload](#cloudinary-image-upload)
- [Development](#development)
- [Building & Deployment](#building--deployment)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

---

## 📌 Overview

STAF Frontend adalah aplikasi single-page application (SPA) yang menyediakan interface lengkap untuk:
- **Authentication** - Login dengan username/password
- **Dashboard** - Overview sistem
- **Manajemen Karyawan** - CRUD dengan upload foto
- **Manajemen Divisi** - CRUD divisi organisasi
- **Profil Pengguna** - View & edit profil admin

### Fitur Utama
✅ Responsive design (Mobile-first)  
✅ Dark/Light/System theme support  
✅ Real-time search & filtering  
✅ Photo upload dengan preview  
✅ Delete confirmation modals  
✅ Pagination support  
✅ Form validation  
✅ Token-based authentication  
✅ Auto-logout on token expiry  
✅ Clean & modern UI dengan Tailwind CSS  

---

## 🎯 Features

### Authentication
- Login/Logout dengan Sanctum token
- Token persisted di localStorage
- Automatic redirect ke login jika token invalid
- Protected routes (guards)

### Manajemen Karyawan
- View semua karyawan dengan pagination
- Search by name
- Filter by division
- Create employee dengan upload foto
- Edit employee (update data & foto)
- Delete employee dengan confirmation modal
- Foto preview sebelum upload
- Validasi form client-side

### Manajemen Divisi
- View semua divisi
- Create division
- Edit division
- Delete division dengan confirmation modal
- Form validation

### Profil Pengguna
- View profil admin yang login
- Edit nama, email, phone
- Read-only avatar
- Auto-update navbar setelah edit

### UI/UX
- Dark/Light/System theme toggle
- Responsive navbar
- Loading states
- Error handling
- Success notifications
- Modal for delete confirmations
- Form field components dengan labels & validation messages

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.x | UI Framework |
| **Vite** | 5.x | Build tool & dev server |
| **Tailwind CSS** | 3.x | Styling |
| **React Router** | 6.x | Routing |
| **Axios** | Latest | HTTP client |
| **Node.js** | 16+ | Runtime |
| **npm/pnpm** | Latest | Package manager |
| **Cloudinary** | Latest | Image hosting & CDN |

---

## 💻 Installation

### Prerequisites
- Node.js 16 atau lebih tinggi
- npm atau pnpm
- Git
- CLI Text Editor (VS Code recommended)

### Langkah 1: Clone Repository
```bash
git clone https://github.com/yourusername/staf-frontend.git
cd staf-frontend
# atau dalam konteks project
cd karyawan-hub-fe
```

### Langkah 2: Install Dependencies
```bash
npm install
# atau jika menggunakan pnpm
pnpm install
```

### Langkah 3: Environment Configuration
Buat file `.env.local` di root project:
```env
VITE_API_URL=https://staf-be-production.up.railway.app/api
```

### Langkah 4: Jalankan Development Server
```bash
npm run dev
# atau
pnpm dev
```

Server akan berjalan di `http://localhost:5173`

---

## ⚙️ Environment Setup

### .env.local Configuration

```env
# API Base URL
VITE_API_URL=https://staf-be-production.up.railway.app/api

# Optional: untuk development local
# VITE_API_URL=http://localhost:8000/api
```

### Build Configuration (vite.config.js)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

---

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build untuk production
npm run build

# Preview production build locally
npm run preview

# Format dan lint code (jika tersedia)
npm run lint
```

### Development Workflow

1. **Start server**
   ```bash
   npm run dev
   ```

2. **Open browser**
   - Navigate to http://localhost:5173

3. **Hot Module Replacement (HMR)**
   - Perubahan file otomatis ter-reload tanpa refresh manual

4. **Test dengan Backend Local**
   - Update `VITE_API_URL` di `.env.local` ke `http://localhost:8000/api`
   - Pastikan backend Laravel running

### Code Structure Best Practices

```
src/
├── api/
│   └── index.js          # API client & endpoints
├── components/
│   ├── Modal.jsx         # Delete confirmation modal
│   ├── SearchInput.jsx   # Search input dengan clear button
│   └── FormField.jsx     # Reusable form field
├── contexts/
│   ├── AuthContext.jsx   # Authentication state
│   └── ThemeContext.jsx  # Dark/light theme state
├── pages/
│   ├── Login.jsx         # Login page
│   ├── Dashboard.jsx     # Dashboard
│   ├── Employees.jsx     # Employees management
│   ├── Divisions.jsx     # Divisions management
│   └── Profile.jsx       # User profile
├── images/               # Static images
├── App.jsx               # Main app component
├── index.css             # Global styles
└── main.jsx              # Entry point
```

---

## 🛠️ Building & Deployment

### Build untuk Production
```bash
npm run build
```

Output akan di folder `dist/`

### Preview Build Locally
```bash
npm run preview
```

---

## 📤 Deployment ke Vercel

### Option 1: Automatic Deployment via GitHub

1. **Push code ke GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin master
```

2. **Connect di Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Select GitHub repository
   - Vercel akan auto-detect React + Vite

3. **Configure Environment Variables**
   - Di Vercel Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://staf-be-production.up.railway.app/api`

4. **Deploy**
   - Vercel otomatis deploy setiap kali ada push ke master
   - Build process: `npm run build`
   - Output: `dist/`

5. **Verify Deployment**
   - Visit project URL dari Vercel dashboard
   - Test login dengan credentials: `admin` / `pastibisa`

### Option 2: Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables interaktif
# Pilih production saat ditanya
```

---

## 📁 Project Structure

```
karyawan-hub-fe/
├── src/
│   ├── api/
│   │   └── index.js              # Axios instance & API calls
│   ├── components/
│   │   ├── Modal.jsx             # Reusable modal component
│   │   ├── SearchInput.jsx       # Search with clear button
│   │   ├── FormField.jsx         # Form field wrapper
│   │   └── Navbar.jsx            # Navigation bar
│   ├── contexts/
│   │   ├── AuthContext.jsx       # Auth state & methods
│   │   └── ThemeContext.jsx      # Theme toggle logic
│   ├── pages/
│   │   ├── Login.jsx             # Login page
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   ├── Employees.jsx         # Employees CRUD (571 lines)
│   │   ├── Divisions.jsx         # Divisions CRUD (378 lines)
│   │   └── Profile.jsx           # Admin profile (read-only avatar)
│   ├── images/
│   │   └── [static images]
│   ├── App.jsx                   # Main app with routes
│   ├── index.css                 # Tailwind import + globals
│   └── main.jsx                  # React entry point
├── public/
│   └── [public assets]
├── .env.local                    # Environment variables (LOCAL)
├── .env.example                  # Environment template
├── index.html                    # HTML entry
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🎨 Styling with Tailwind CSS

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

### Custom Color Scheme
- Primary: Indigo (`indigo-600`)
- Secondary: Gray (`gray-600`)
- Danger: Red (`red-600`)
- Success: Green (`green-600`)

### Dark Mode
Implemented via `ThemeContext`:
- Stores preference di `localStorage`
- Default: system preference
- Toggle di navbar

---

## 🔐 API Integration

### API Client ([src/api/index.js](src/api/index.js))

```javascript
const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
})

// Auto-attach token ke header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Key API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/login` | Authentication |
| POST | `/logout` | Revoke token |
| GET | `/profile` | Get admin profile |
| PUT | `/profile` | Update profile |
| GET | `/divisions` | List divisions |
| POST | `/divisions` | Create division |
| PUT | `/divisions/{id}` | Update division |
| DELETE | `/divisions/{id}` | Delete division |
| GET | `/employees` | List employees |
| POST | `/employees` | Create employee |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

### FormData Handling
Untuk request dengan file (photos), gunakan FormData dengan POST method override:
```javascript
const formData = new FormData()
formData.append('name', data.name)
formData.append('image', data.image)
formData.append('_method', 'PUT') // Laravel method override

api.post(`/employees/${id}`, formData)
```

---

## 🧪 Testing

### Manual Testing Workflow

1. **Login**
   - Username: `admin`
   - Password: `pastibisa`

2. **Test Employees**
   - Create: Upload foto, verify di list
   - Edit: Update nama, verify changes
   - Delete: Confirm modal appears
   - Search: Type nama, click cari
   - Filter: Select divisi, verify results

3. **Test Divisions**
   - Create: Add divisi baru
   - Edit: Update nama
   - Delete: Confirm modal
   - Verify employees bisa assign ke divisi baru

4. **Test Profile**
   - Edit: Update nama/email/phone
   - Verify: Navbar updates otomatis

5. **Test Theme**
   - Toggle dark/light mode
   - Verify colors change
   - Refresh page (persistence check)

---

## 🐛 Troubleshooting

### Error: "API request failed (CORS)"
**Cause:** Backend tidak allow frontend URL  
**Solution:**
- Verify `VITE_API_URL` di `.env.local` benar
- Check backend `CORS_ALLOWED_ORIGINS` setting
- Ensure backend API running

### Error: "Token invalid"
**Cause:** Token expired atau invalid  
**Solution:**
- Silakan login ulang
- Check `localStorage` di DevTools
- Verify backend token belum di-revoke

### Error: "Image not loading"
**Cause:** Image path invalid atau symlink missing  
**Solution:**
- Backend: Run `php artisan storage:link`
- Verify image di `storage/app/public/employees/`
- Check photo URL format di API response

### Error: "Login button tidak response"
**Cause:** API unreachable  
**Solution:**
- Check `VITE_API_URL` di `.env.local`
- Verify backend running di URL yang specified
- Check browser network tab untuk error detail

### Error: "npm install fails"
**Cause:** Node version incompatibility  
**Solution:**
```bash
# Update Node.js ke versi terbaru
node --version  # Check current version
# Install node v18+ atau v20+

# Clear cache
npm cache clean --force

# Reinstall
npm install
```

---

## ☁️ Cloudinary Image Upload

### Overview
Aplikasi menggunakan **Cloudinary** untuk upload dan hosting gambar karyawan. Setiap foto diupload ke Cloudinary dan URL-nya disimpan di database.

### Configuration

#### Environment Variables
Tambahkan di `.env.local`:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

#### Cloudinary Dashboard Setup
1. Login ke https://cloudinary.com/console
2. Copy **Cloud Name** dari Dashboard
3. Ke Settings → Upload → Upload presets
4. Add upload preset dengan:
   - Signing Mode: **Unsigned**
   - Folder: `employees`
   - Allowed formats: jpg, png, jpeg
5. Copy **Upload preset name** ke `VITE_CLOUDINARY_UPLOAD_PRESET`

### Troubleshooting

#### Error: "Upload preset not found"
- Verify `VITE_CLOUDINARY_UPLOAD_PRESET` di `.env.local`
- Pastikan upload preset dibuat dengan mode "Unsigned"
- Check nama preset sama persis (case-sensitive)

#### Error: "Resource not found"
- Cloudinary URL mungkin expired atau invalid
- Check browser network tab untuk response detail
- Verify image URL bisa diakses langsung di browser

---

## 📝 Common Issues & Solutions

### Development Server tidak auto-reload
```bash
# Kill process & restart
npm run dev
```

### Tailwind styles tidak apply
```bash
# Ensure .env.local ada dengan VITE_API_URL
# Rebuild CSS with PostCSS
npm run build

# Development: styles akan auto-compile
```

### Build fails pada Vercel
- Check Node version mismatch
- Verify all environment variables set
- Run `npm run build` locally untuk test

---

## 🔗 Related Documentation

- **Backend README:** [../karyawan-hub/README.md](../karyawan-hub/README.md)
- **Postman Collection:** [../postman_collection.json](../postman_collection.json)
- **API Demo:** https://staf-be-production.up.railway.app/api/health
