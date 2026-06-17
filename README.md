# 🍔 BigBite – Food Ordering Web App

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-API%20Proxy-000?logo=express)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green)

BigBite is a Swiggy-inspired food ordering web application built with React, Redux Toolkit, Tailwind CSS, and a lightweight Express backend. It allows users to browse restaurants, explore menus, manage their cart, and place orders. Restaurant data is fetched through a backend proxy with a mock-data fallback, while authentication is handled using Firebase Auth.

---

## 🚀 Live Demo

> > **Note:** The Firebase Hosting project uses the default name `food-app-c1fce`, but the application is branded as **BigBite** throughout the UI and documentation.

🔗 [View Live Demo](https://food-app-c1fce.web.app/)

---

## ✨ Features

- 🍽️ Browse restaurants using a backend proxy that fetches Swiggy data
- 🧩 Browse restaurant menus organized into expandable categories
- 🔍 Search restaurants by name and cuisine
- 📍 Select location from popular cities or use current GPS-based location
- 🛒 Add/remove menu items into a cart with quantity handling
- 💰 Cart billing breakdown with subtotal, delivery fee, packaging, platform fee, GST, and total
- 🔒 Protected cart route requiring Firebase authentication
- 🔐 Firebase Auth sign in, sign up, and password reset flows
- ✅ Simulated order placement with confirmation and cart reset
- 🌙 Dark mode with theme preference persisted in localStorage
- ⚡ Responsive UI with shimmer loading states and offline error handling
- 🧠 Centralized state management using Redux Toolkit

---

## 🛠️ Tech Stack

- **Frontend:** React  
- **State Management:** Redux Toolkit  
- **Styling:** Tailwind CSS  
- **Routing:** React Router  
- **Authentication:** Firebase Auth  
- **Backend:** Express.js (Node.js) 
- **API Proxy:** Swiggy data fetch with mock fallback  
- **Build Tool:** Create React App (Webpack)  
- **Package Manager:** yarn  
- **Version Control:** Git & GitHub  
- **Hosting:** Firebase

---

## 📂 Project Structure

```text
.
├── backend/                # Express API proxy and mock menu fallback
│   ├── index.js
│   └── MockData/mockData.json
├── public/                 # Static public assets
├── src/                    # React source code
│   ├── components/         # UI components
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Redux slices, helpers, constants, Firebase setup
│   └── App.jsx
├── package.json
├── firebase.json           # Firebase hosting configuration
├── .firebaserc             # Firebase project config
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md
```

## ⚙️ How it works

- The frontend is a React app that displays restaurant listings, menu categories, and cart interactions.
- A local Express backend proxy fetches Swiggy restaurant and menu data to avoid browser CORS issues.
- If the Swiggy API fetch fails, the backend falls back to `backend/MockData/mockData.json` for menu data.
- User authentication is handled by Firebase Auth, including sign in, sign up, and password reset.
- Cart data, theme mode, and selected location are managed with Redux Toolkit and persisted in localStorage where appropriate.

---

## 🏗️ Architecture

```text
+------------------+
|  React Frontend  |
+------------------+
         │
         ▼
+---------------------+
| Express API Proxy   |
+---------------------+
    │              │
    ▼              ▼
Swiggy Public API   Local Mock Data
                     (Fallback)

Firebase Auth ─────────► Authentication
Redux Toolkit ────────► Global State
localStorage ─────────► Theme & Preferences
```

---

## 🔧 Installation & Setup

### Pre-requisites:
- Node.js (v16 or higher)
- Yarn (package manager)
- Git

1. **Clone the repository**
   ```bash
   git clone https://github.com/venkateshmadupuru/food-web-app.git
   cd food-web-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   cd backend
   yarn install
   cd ..
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root with:
   ```bash
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Run the backend server**
   ```bash
   cd backend
   yarn start
   ```

5. **Run the frontend**
   ```bash
   cd ..
   yarn start
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000` to view the application.

> Note: The backend proxy is required so the frontend can fetch Swiggy restaurant and menu data without browser CORS issues.
---
## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements
- Swiggy public API for restaurant and menu data
- React, Redux Toolkit, and Tailwind CSS communities
