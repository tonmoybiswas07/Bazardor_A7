# 🛒 বাজার দর (BazarDor)

**BazarDor — Your Smart Daily Shopping Companion**

বাজার দর (BazarDor) is a modern web application designed to make everyday shopping easier and more convenient. It helps users explore products, check prices, and manage their shopping experience through a simple and user-friendly interface.

## 🚀 Technologies Used

- **Next.js** — React framework for building the web application
- **TypeScript** — Type-safe JavaScript development
- **Tailwind CSS** — Utility-first styling for responsive UI
- **MongoDB** — Database for storing application data
- **Better Auth** — Authentication and account management
- **Google OAuth** — Sign in with Google
- **GitHub OAuth** — Sign in with GitHub

## ✨ Key Features

1. **🛍️ Product Browsing** — Explore products through an intuitive shopping interface.
2. **💰 Price Information** — View product prices to make informed shopping decisions.
3. **🔐 Secure Authentication** — Sign up and sign in using email and password.
4. **🌐 Social Login** — Authenticate conveniently using Google or GitHub.
5. **📱 Responsive Design** — Enjoy a user-friendly experience across desktop, tablet, and mobile devices.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tonmoybiswas07/Bazardor_A7
   ```

2. Navigate to the project directory:

   ```bash
   cd bazardor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure the required environment variables:

   ```env
   MONGODB_USER_SECRECT=your_mongodb_connection_string

   BETTER_AUTH_URL=http://localhost:3000

   GOOGLE_AUTH_CLIENT_ID=your_google_client_id
   GOOGLE_AUTH_CLIENT_SECRECT=your_google_client_secret

   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRECT=your_github_client_secret
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Environment Variables

Never commit `.env.local` or expose database credentials and OAuth client secrets publicly. Make sure `.env.local` is included in `.gitignore`.

## 👨‍💻 Author

Developed with ❤️ using Next.js and TypeScript.

---

**বাজার দর (BazarDor) — Making everyday shopping simpler!**
