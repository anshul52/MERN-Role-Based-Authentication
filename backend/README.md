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
✅ **PostgreSQL** for user data (via Sequelize/Prisma ORM)  
✅ **Redis** for session management & OTP storage  
✅ **Security Enhancements**: Secure cookies, rate limiting, bcrypt password hashing

---

## **📂 Project Structure**
