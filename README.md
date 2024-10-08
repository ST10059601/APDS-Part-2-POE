# 📋 **Payment Portal Application**

### 🚀 **Overview**

This is a full-stack web application for submitting **international payment requests**. Users can register, log in, and securely submit payment requests using **SWIFT** or other supported providers. The app provides secure user authentication and includes functionality for seamless and secure payment submissions.

---

## 🛠 **Features**
- 🔐 **User Authentication**:
  - **JWT Token-based authentication** ensures secure access.
  - Password security with **hashing and salting** using **bcrypt**.
  
- 💳 **Payment Submission**:
  - Submit international payments using **SWIFT**.
  - Payment details include amount, currency, recipient account, and SWIFT code.

- 🌍 **Secure Communications**:
  - **HTTPS** communication for secure data transfer.
  - Protection against **common web attacks** using **Helmet.js**, **CORS**, and **Rate Limiting**.

---

## 📦 **Installation Instructions**

### Prerequisites:
- [Node.js](https://nodejs.org/en/) installed
- [MongoDB](https://www.mongodb.com/) (if using MongoDB as a database)
- SSL Certificates for HTTPS setup

### Backend Setup:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ST10059601/APDS-Part-2-POE.git
   cd APDS-Part-2-POE/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend` directory with the following:
   ```env
   ATLAS_URI=<your-mongodb-atlas-uri>
   ```

4. **Run the backend**:
   ```bash
   npm run dev
   ```

### Frontend Setup:

1. **Navigate to the frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend**:
   ```bash
   npm start
   ```

---

## ⚙️ **Technologies Used**

### **Frontend**:
- **React.js** for building interactive user interfaces.
- **React Router DOM** for handling page navigation.

### **Backend**:
- **Node.js** and **Express.js** for server-side logic.
- **MongoDB** for user and payment data storage.
- **JWT** for secure authentication.
  
### **Security**:
- **Helmet.js**: Secures HTTP headers.
- **CORS**: Manages cross-origin requests.
- **Express-Rate-Limit**: Protects against DDoS attacks.
- **bcrypt**: Secure password hashing.

---

## 📄 **Usage**

1. **Register** an account via the `/register` page.
2. **Login** to your account using `/login`.
3. Navigate to **Submit Payment Request** to fill in the necessary details.
4. Upon successful submission, you'll be redirected to a **payment success page**.

---

## 🔒 **Security Features**
- **HTTPS** ensures all communications are encrypted.
- **Brute Force Protection**: Limits login attempts to prevent account hacking.
- **Session Security**: Sessions are managed securely with HTTP-only cookies.
- Protection from **XSS**, **Clickjacking**, and **SQL Injection**.

---

