# OneSync Web

OneSync Web is the browser companion for the OneSync ecosystem. It allows users to receive and manage notifications from their Android devices directly in a web interface.

---

## 🚀 Features

* 🔔 Real-time notification sync
* 🪟 Pop-out mode for focused notification viewing
* 🔐 Authentication with:

  * Google Sign-In
  * Email & Password
* 🔗 Account linking (Google + Password)
* 📱 Mobile-aware UI (download prompt on mobile devices)
* ⚙️ Settings panel with account management

---

## 📱 Android App

This web app works together with the OneSync Android app:

👉 https://github.com/one-dhiraj/onesync

---

## 🧑‍💻 Tech Stack

* React (Vite)
* Tailwind CSS
* Firebase (Auth + Cloud Messaging + Firestore)

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/one-dhiraj/onesync-web.git
cd onesync-web
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Add environment variables

Please check the `.env.example` file for a complete list of env variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

### 4. Run the app

```bash
npm run dev
```

---

### 5. Preview production build

```bash
npm run build
npm run preview
```

---

## 🔐 Firebase Setup

* Enable Authentication:

  * Google
  * Email/Password
* Add your domain in **Authorized Domains**
* Enable Cloud Messaging (FCM)
* Configure Firestore (for device storage)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

---

## 📄 License

MIT License
