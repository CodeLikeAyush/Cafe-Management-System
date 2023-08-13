# Cafe Management System

Welcome to the Cafe Management System! This web application is an end-to-end solution built using Node.js, Express, MySQL, ejs, HTML, CSS, and JavaScript. I was inspired to create this project after visiting a night canteen in my college, where I noticed their billing system was a desktop application. Leveraging my web development skills, I completed this project in just 24 days, and I've since made functionality improvements, UI enhancements, and bug fixes.

This project has been a tremendous learning experience, allowing me to apply the theoretical knowledge I've gained throughout my web development journey.

## Features:

* User Registration and Account Verification
* Admin Authorization
* User Login with Dashboard Access

## User Interactions:

* Admin Dashboard: Displaying Total Categories, Total Products, and Total Orders
* Manage Products: Add new products, search products, delete products, edit products, and update stock
* Create Order: Initiate a new order
* View Bills: Access order bills and search for specific bills
* Manage Category: Add new categories, delete categories, and search for categories

## Technical Features:

* Password hashing using bcrypt.js
* Account verification using OTP
* Session management using Cookies and JSON Web Tokens (JWT)
* Protected routes for authenticated and authorized users

## Tech Stack:

**Client:** HTML, CSS, JavaScript, ejs

**Server:** Node.js, Express, MySQL

## Before You Run Locally:

Before running this project locally, you need email credentials for the mail services used in the project. Here's how to get your credentials:

1. Signup for [Zoho Mail](https://www.zoho.com/mail/signup.html) for free.
2. Navigate to your **My Profile** icon.
3. Go to **My Account**.
4. Access the **Security** section.
5. Find **App Passwords** and generate a new password.
6. Use these credentials (Email and PASSWORD) in the `.env` file.

## Run Locally:

### Run Using Docker Container:

1. Download and install Docker Desktop.
2. Add your mail credentials and other environment variables in `docker-compose.yml`.
3. In the root directory of the project (where `package.json` is located), run the following command:

```bash
docker-compose up -d
```

Navigate to `http://localhost:4000/` to access the web app.

To stop the container:

```bash
docker-compose down
```

### Run Without Using Docker Container:

1. Make sure you have Node.js, Git, and MySQL installed.
2. Clone the project:

```bash
git clone https://github.com/CodeLikeAyush/Cafe-Management-System.git
```

3. Go to the project directory:

```bash
cd Cafe-Management-System
```

4. Install dependencies:

```bash
npm install
```

5. Create a `.env` file in the root directory of the project and add the required environment variables.

6. Start the server:

```bash
npm start
```

Navigate to `http://localhost:8080/` to see the web app online.

## Database:

![ER Model](./ayush-cafe-ER-Model.png)

## Environment Variables:

In your `.env` file, you should have the following environment variables:

- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `EMAIL`: Your email
- `PASSWORD`: App-specific password for the specified email (from Zoho Mail or similar)

## License:

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Feel free to explore, modify, and use this project as you wish. Please refer to the [MIT License](https://choosealicense.com/licenses/mit/) for details. Happy coding! 😊