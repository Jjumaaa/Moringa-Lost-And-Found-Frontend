# Moringa Lost & Found Inventory System

An inventory management system designed to help **students and staff at Moringa School** easily report and recover lost and found items. This full-stack application streamlines the process of tracking items, facilitating claims, and managing rewards.

---

## Project Overview
Items are often misplaced at Moringa School, making recovery frustrating. This project solves that by providing a **centralized platform** for managing lost and found items, ensuring smooth tracking, claiming, and reward management.

---

## Problem Statement
- Students and staff frequently misplace personal items.  
- The current manual process for retrieving them is slow and unreliable.  

---

## Solution
A web-based system that allows:
- Users → report lost/found items, initiate claims, offer rewards.  
- Admins → manage inventory, approve claims, oversee users, and track reward history.  

---

## Features

### User Capabilities
- Authentication & Registration  
- Report lost or found items  
- Browse items & search/filter  
- Comment on items and interact with others  
- Offer/receive rewards for returned items  
- Manage personal profile & reward history  

### Admin Capabilities
- Secure login with elevated privileges  
- Manage all reported items (add, update, delete, upload images)  
- Approve/reject item claims  
- Dashboard with key metrics (users, lost/found items, claims, rewards)  
- Full record keeping (items recovered, rewards paid, claims history)  

---

## Tech Stack

### Frontend
- React.js + React Router  
- Redux Toolkit for state management  
- Axios + Fetch API for API requests  
- CSS Modules & React Icons  

### Backend
- Flask (Python)  
- SQLite + SQLAlchemy + Flask-Migrate  
- JWT Authentication (Flask-JWT-Extended)  
- Flask-CORS for frontend-backend communication  
- Werkzeug for password hashing  

---

## Getting Started

### Prerequisites
- Python 3.8+  
- Node.js (LTS)  
- SQLite  
- Git  

### Backend Setup (Flask)
```bash
git clone git@github.com:Jjumaaa/Moringa-Lost-And-Found-Backend.git
cd Moringa-Lost-And-Found-Backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate   

# Install dependencies
pip install -r requirements.txt

# Create .env file
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_flask_secret
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=postgresql://postgres:password@localhost:5432/moringa_lost_found

# Initialize DB
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Run server
flask run --port 10000
Frontend Setup (React)
bash
Copy
Edit
cd moringa-lost-and-found-frontend
npm install   

# .env
REACT_APP_API_BASE_URL=http://127.0.0.1:10000

# Run frontend
npm start     
Usage Guide
Authentication
Register with username, email, password (role: user/admin).

Login → redirect to User Dashboard or Admin Dashboard.

User Flow
Report lost/found items

Browse/search items

Claim items & comment on reports

Offer rewards & track history

Admin Flow
Manage users & items

Approve claims

Oversee reward transactions

Dashboard with metrics

API Endpoints
Method	Endpoint	Description	Access
POST	/register	Register a new user/admin	Public
POST	/login	Authenticate & get JWT token	Public
GET	/me	Get current user profile	Private
PATCH	/users/me	Update current user profile	Private
GET	/users	Get all users	Admin Only
GET	/items	Get all items	Public
POST	/items	Report a new item	Private
GET	/items/:id	Get item details	Public
PATCH	/items/:id	Update item details	Private
DELETE	/items/:id	Delete an item	Admin Only
POST	/claims	Initiate claim	Admin Only
PATCH	/claims/:id/approve	Approve claim	Admin Only
POST	/comments	Add comment	Private
PATCH	/comments/:id	Edit comment	Private
DELETE	/comments/:id	Delete comment	Private
POST	/rewards	Offer reward for item	Private
PATCH	/rewards/:id/pay	Mark reward as paid	Private
GET	/rewards/history	Get reward history	Private
POST	/images	Upload item image	Private
DELETE	/images/:id	Delete item image	Private

Project Structure
bash
Copy
Edit
moringa-lost-and-found-frontend/
│── public/
│── src/
│   ├── api/axiosConfig.js
│   ├── app/store.js
│   ├── components/Sidebar.js
│   ├── features/
│   │   ├── admin/ (AdminDashboard.js, adminSlice.js, ...)
│   │   ├── auth/ (Login.js, Register.js, authSlice.js)
│   │   ├── comments/ (CommentSection.js, commentSlice.js)
│   │   ├── items/ (ItemDetails.js, itemSlice.js)
│   │   ├── rewards/ (OfferReward.js, RewardHistory.js, rewardSlice.js)
│   │   └── user/ (UserProfile.js, userSlice.js)
│   ├── routes/AppRoutes.js
│   ├── styles/App.module.css
│   ├── utils/helpers.js
│   ├── App.js
│   └── index.js
│── .env
│── package.json

Contributing
Contributions are welcome!

Open an issue for suggestions/bugs.

Submit a pull request for improvements.

License
Licensed under the MIT License. See the LICENSE file.

Acknowledgements
Moringa School for the project idea and learning environment.