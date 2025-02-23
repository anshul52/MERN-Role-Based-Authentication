# **📌 MERN Stack Role-Based Authentication with OTP Verification** 🚀

### **Secure authentication with phone number verification, JWT, Redis, and PostgreSQL.**

---

## **📖 Overview**

This project implements **role-based authentication** in a **MERN stack** application with **OTP verification**. It ensures secure user authentication and session management using **JWT, Redis, and PostgreSQL**.

### **🔹 Features**

✅ User registration with **phone number, password & role (Admin/User)**  
✅ **OTP verification** before login (stored in **Redis** with expiry)  
✅ **JWT-based authentication** stored in **HTTP-only cookies**  
✅ **Refresh tokens** for session persistence  
✅ **Role-Based Access Control (RBAC)** → Admins manage users; regular users access general content  
✅ **PostgreSQL** for user data (via Sequelize)  
✅ **Redis** for session management & OTP storage  
✅ **Security Enhancements**: Secure cookies, rate limiting, bcrypt password hashing

---

## **📂 Installation & Setup**

### **1️⃣ Clone the Repository**

git clone https://github.com/anshul52/MERN-Role-Based-Authentication

cd backend

### **2️⃣ Install Dependencies**

npm install

### **3️⃣ Configure Environment Variables**

Create a .env file and add all the filed present in .env.example

### **4️⃣ Run Backend Server**

npm run dev

## Server runs at http://localhost:5000

---

## **POSTMAN COLLECTION**

I have added postman collection in folder [ postman collection ] in .json format , YOU can use for api testing

## **Desclaimer**

→ Please use that number in api body which is already verifyed by twilio account

→ If by chance your twilio credential doesnot work . So I have added a console so you can check OTP from terminal and continue testing
