# Hotel Request Management System

A full-stack application for managing booking requests, built with:
- **Frontend**: React.js + Vite
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

---

## Features
- Create, view, update, and delete hotel requests.
- Filter requests by status (Upcoming/Completed/Cancelled).
- Responsive design for all devices.

---

## Deployment Links
- **Frontend**: [https://vibe-copilot.vercel.app/](https://vibe-copilot.vercel.app/)
- **Backend**: [https://vibe-copilot-77jk.onrender.com/](https://vibe-copilot-77jk.onrender.com/)

---

## Prerequisites
- **Frontend**: React.js
- **Backend**: Python
- **Database**: MongoDB

---

## Setup Instructions

### Backend Setup
1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   Edit `.env` with your MongoDB URI:
   ```
   MONGO_URI="mongodb+srv://<username>:<db_password>@cluster0.5zhqbdd.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0"
   ```

5. **Run the server**:
   ```bash
   uvicorn main:app --reload
   ```

---

### Frontend Setup
1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set your backend URL**:
   Create a `.env` file and add:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## Deployment

### Backend (Render)
1. **Connect your GitHub repo to Render**.
2. **Set environment variables** in the Render dashboard:
   - `MONGO_URI`
   - `PORT` (auto-set by Render)
3. **Set the start command**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

### Frontend (Vercel)
1. **Import your Git repository** in Vercel.
2. **Set environment variable**:
   ```
   VITE_API_URL=https://your-render-backend.onrender.com
   ```

---

## API Endpoints

| Method | Endpoint                  | Description            |
|--------|---------------------------|------------------------|
| GET    | `/hotel_requests`         | List all requests      |
| POST   | `/hotel_requests`         | Create new request     |
| GET    | `/hotel_requests/{id}`    | Get single request     |
| PUT    | `/hotel_requests/{id}`    | Update request         |
| DELETE | `/hotel_requests/{id}`    | Delete request         |

--- 