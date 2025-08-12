# Car Rent App – Full Stack Car Rental Platform

A modern full-stack car rental application built with **React**, **Node.js**, **Express**, and **MongoDB**.  
This app allows users to **browse, book, and manage car rentals** in real-time, while owners can **list and manage their vehicles** through an intuitive dashboard.  
Includes **JWT authentication**, **ImageKit** integration for secure image uploads, and a **responsive, animated UI** styled with Tailwind CSS and Framer Motion.

---

##  Features

-  **Secure Authentication** – JWT-based signup & login
-  **Car Management** – Add, edit, and delete car listings with images
-  **Real-Time Booking** – Check availability & confirm rentals instantly
-  **Owner Dashboard** – Manage all cars and bookings in one place
-  **Responsive UI** – Optimized for desktop, tablet, and mobile
-  **Animations** – Smooth transitions with Framer Motion

---

##  Tech Stack

**Frontend:** React, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB  
**Image Hosting:** ImageKit.io  
**Authentication:** JSON Web Tokens (JWT)  

---

##  Getting Started

### 1️ Clone the repository
```bash
git clone https://github.com/Atul1FB/car-rent_app.git
cd car-rent_app

2️Install dependencies
Frontend:
cd client
npm install

Backend:
cd server
npm install

3️
Environment Variables
Create a .env file in your backend folder and add:

MONGO_URI=your_mongo_database_url
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint

4️ Run the app
Frontend:

cd client
npm start

Backend:

cd server
npm run dev

