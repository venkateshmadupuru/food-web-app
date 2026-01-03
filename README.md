# 🍔 BigBite – Food Ordering Web App

BigBite is a Swiggy-inspired food ordering web application built with **React**, **Redux Toolkit**, and **Tailwind CSS**.  
The app allows users to browse restaurants, view menus, manage their cart, and place orders.  
User authentication is handled via **Firebase Auth**, and the app uses mock data to simulate API responses, falling back to live Swiggy API when possible.

---

## 🚀 Live Demo

> Note: The Firebase project was created with the default name “Food App”, so the live demo URL contains `food-app-c1fce`. The app is branded as **BigBite** in the UI and README.

🔗 [View Live Demo](https://food-app-c1fce.web.app/)

---

## ✨ Features

- 🍽️ Browse restaurants with live Swiggy data (falls back to mock data when live API is unavailable due to CORS)  
- 📋 View restaurant menus and item details  
- 🔍 Search for restaurants and dishes  
- 🛒 Add and remove items from the cart  
- 💰 Real-time cart price calculation  
- 🔐 User authentication (Sign in / Sign out)  
- ✅ Order placement with confirmation message  
- ⚡ Fast and optimized UI  
- 📱 Fully responsive design  
- 🌙 Dark mode support  
- 🧠 Centralized state management using Redux Toolkit

---

## 🛠️ Tech Stack

- **Frontend:** React  
- **State Management:** Redux Toolkit  
- **Styling:** Tailwind CSS  
- **Routing:** React Router  
- **Authentication:** Firebase Auth  
- **API:** Swiggy Public API  
- **Build Tool:** Create React App (Webpack)  
- **Package Manager:** yarn  
- **Version Control:** Git & GitHub  
- **Hosting:** Firebase

---

## 📂 Project Structure

```text
.
├── backend/            # Mock API data / sample responses
│   ├── data/
│   └── mockData.json
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   └── App.jsx
├── package.json
├── yarn.lock
├── firebase.json       # Firebase hosting configuration
├── .firebaserc         # Firebase project config
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── README.md
```
## 🔧 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/venkateshmadupuru/food-web-app.git
   cd food-web-app
   ```

2. **Install Dependencies**
   ```bash
    yarn install
    ```

3. **Run the Application**
   ```bash
    yarn start
    ```

4. **Open in Browser**
   Navigate to `http://localhost:3000` to view the application.
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
