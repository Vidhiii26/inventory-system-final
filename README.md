# Inventory & Order Management System

A full-stack web application designed for efficient tracking of products, customers, and order processing.

## Live Demo
- **Frontend:** [https://inventory-management-system-chi-six.vercel.app/](https://inventory-management-system-chi-six.vercel.app/)
- **Backend API:** [https://inventory-system-final-zzln.onrender.com/](https://inventory-system-final-zzln.onrender.com/)

## Tech Stack
- **Frontend:** React.js, Vite, Axios
- **Backend:** FastAPI (Python), SQLAlchemy
- **Database:** PostgreSQL (Neon)
- **Deployment:** Vercel (Frontend), Render (Backend)

## Key Features
- **Product Management:** Add, view, update, and delete products easily.
- **Customer Management:** Manage customer records efficiently.
- **Order Processing:** Automated order placement with stock inventory validation.
- **Real-time Tracking:** Monitor stock levels and low-stock alerts.

## How to run locally
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Vidhiii26/inventory-system-final.git](https://github.com/Vidhiii26/inventory-system-final.git)

2. **Setup Backend:**

Bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

3. **Setup Frontend:**

Bash
cd frontend
npm install
npm run dev   