# Scheduler Frontend

This is the frontend (React + Vite) for the appointment booking SaaS project.  
Users can submit appointment details, view all bookings, and delete bookings — all connected to a live backend API.

---

## 🌍 Live URLs

**Frontend (Vercel):**  
https://scheduler-frontend-kappa.vercel.app/

**Backend API (Render):**  
https://scheduler-backend-qhdh.onrender.com/

---

## ⭐ Features

- Clean, responsive booking form  
- Dashboard showing all bookings from the backend  
- Delete functionality to remove bookings  
- Auto-refreshes after add/delete  
- Fully deployed and accessible online  
- Works with MongoDB Atlas through the backend  

---

## 🧩 Tech Stack

- **React** (with Vite)
- **JavaScript**
- **HTML/CSS**
- **Vercel** (hosting)
- **Render** (backend hosting)
- **MongoDB Atlas** (database)

---

## 📁 Project Structure

frontend/
public/
src/
App.jsx
main.jsx
index.html
package.json
vite.config.js


---

## 🔗 API Endpoints Used

All data comes from your live backend at:



https://scheduler-backend-qhdh.onrender.com


### `POST /book`
Creates a new booking.

### `GET /bookings`
Fetches all stored bookings.

### `DELETE /bookings/:id`
Deletes a booking by its ID.

---

## 🖥 Running Locally (optional)

You do **not** need to run it locally — the live version works perfectly.  
But if you ever want to work on it:

```bash
git clone https://github.com/<your-username>/scheduler-frontend.git
cd scheduler-frontend
npm install
npm run dev


Then open:

http://localhost:5173/

🚀 Deployment (Vercel)

Framework preset: Vite

Build command: npm run build

Output directory: dist

Every time you push code to GitHub, Vercel automatically redeploys it.

🔮 Future Improvements

Add a calendar view

Add booking notes

Edit booking feature

Service dropdown

Admin login

Email/SMS reminders

🔗 Related Projects

Backend repository:
https://github.com/
<your-username>/scheduler-backend

