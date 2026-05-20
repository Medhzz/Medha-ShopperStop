# MedhaShopperStop

A dress shop web app built with HTML, CSS, JavaScript, jQuery and Firebase.

---

## Tech Used

HTML, CSS, JavaScript, jQuery for the frontend. Firebase for authentication and the Firestore database.

---

## Pages

index.html is the login and signup page. pages/shop.html is where customers browse and shop. pages/admin.html is the admin dashboard. pages/history.html shows a customer's past orders.

---

## Setup Steps

1. Go to firebase.google.com and create a new project
2. Enable Email/Password and Google sign-in under Authentication
3. Create a Firestore database
4. Paste your Firebase config into js/firebase-config.js
5. Set your admin email in the ADMIN_EMAIL variable inside firebase-config.js
6. Open index.html in a browser

---

## Admin Login

Whoever's email is set as ADMIN_EMAIL in firebase-config.js will automatically get admin access when they log in.

---

## What the Admin Can Do

Add, edit and delete products and categories. Manage customers and set their credit limits. View inventory reports, sales reports and customer reports.

---

## What the Customer Can Do

Sign up, sign in and reset their password. Browse and search dresses by category. Add items to cart and checkout using cash or credit. View their order history.

---

## Color Theme

Gradient from dark pink to black.
