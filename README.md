# 🐾 Virtual Pets - Frontend (React)

![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Version](https://img.shields.io/badge/Version-0.1.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 💻 Features

- 📝 **User Authentication**: Login and Register with role-based routing.
- 🐶 **Pet Management**: Add, edit, delete, and view pets.
- 👨‍💼 **Admin Dashboard**: View all pets for administrative purposes.
- 🔒 **Private Routes**: Protect user and admin routes.
- 🌐 **Responsive UI**: Built with TailwindCSS.
- 📦 **API Integration**: Communicates with backend REST API.

## ⚙️ Requirements

- 🐳 **Docker** (if running backend locally in container)
- 🛠️ **Node.js >= 18**
- 📦 **npm >= 9**
- 🌐 **Internet Connection** (for API requests and package installation)

## 🧩 Tech Stack

- ⚛️ React 19
- 🛠️ TailwindCSS 3
- 📡 Axios for API calls
- 🗂️ React Router v7 for navigation
- 🔐 JWT-based Authentication
- 🧪 React Testing Library for frontend tests

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment

Create a `.env` file in the root:

```
REACT_APP_API_URL=http://localhost:8080
```

### 3️⃣ Run Development Server

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4️⃣ Run Tests

```bash
npm test
```

### 5️⃣ Build for Production

```bash
npm run build
```

## 📂 Project Structure

```
src/
 ├─ api/           # API request functions
 ├─ components/    # Reusable UI components
 │   ├─ auth/      # Login, Register, PrivateRoute
 │   └─ pets/      # PetForm, PetList
 ├─ context/       # AuthContext
 ├─ pages/         # Home, Dashboard, AdminDashboard
 ├─ App.js
 ├─ index.js
 └─ index.css
```

## 🔗 API Endpoints

- POST `/auth/login` - Login user
- POST `/auth/register` - Register user
- GET `/pets` - Get user/admin pets
- POST `/pets` - Add pet
- PUT `/pets/:id` - Update pet
- DELETE `/pets/:id` - Delete pet

## 🛡️ Authentication Flow

1. User logs in/registers via forms.
2. JWT token is saved in `localStorage`.
3. Protected routes use token to verify user role.
4. Admin users can access `/admin` dashboard.

## 📄 Notes

- ⚠️ Ensure backend is running and accessible.
- 🔄 The app automatically adds JWT token to API requests.
- 🧪 Tests are configured with React Testing Library.


