# 🛡️ AI Credit Shield

**AI Credit Shield** is an AI-powered financial health tool designed to help users make smarter purchasing decisions. It analyzes the potential impact of a transaction on a user's credit score and utilization before they hit the "Buy" button.

The application features a stylized "Amazon-demo" interface where users can simulate purchases and receive real-time feedback (Green/Orange/Red signals) based on their current credit profile and chosen payment method.

---

## 🚀 Features

- **Real-time Credit Analysis**: Instantly calculates how a purchase affects your credit utilization ratio.
- **Smart EMI Recommendations**: Suggests optimal EMI tenures to keep your monthly debt burden low and your credit score healthy.
- **Dynamic Risk Assessment**:
  - 🟢 **Green**: Safe transaction with minimal impact.
  - 🟠 **Orange**: Caution—high utilization or steep monthly payments.
  - 🔴 **Red**: Critical—risk of maxing out your card or significant score drop.
- **Bank-Specific Logic**: Factors in interest rates from major banks (HDFC, SBI, ICICI, Axis).
- **Interactive Demo Panel**: Real-time sliders to adjust credit limits, existing debt, and item prices for simulation.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Functional components and Hooks.
- **Vanilla CSS**: Premium, responsive mobile-frame UI.
- **Fetch API**: For seamless communication with the backend.

### Backend
- **FastAPI**: High-performance Python framework.
- **Pydantic**: For robust data validation.
- **CORS Middleware**: Pre-configured for local development.

---

## 📥 Installation & Setup

### 1. Backend Setup (Python)
Navigate to the `backend` directory:
```bash
cd backend
```
Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```
Install requirements (FastAPI, Uvicorn):
```bash
pip install fastapi uvicorn
```
Run the server:
```bash
uvicorn main:app --reload
```
The backend will be running at `http://127.0.0.1:8000`.

### 2. Frontend Setup (React)
Navigate to the `frontend` directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the application:
```bash
npm start
```
The app will open at `http://localhost:3000`.

---

## 🧠 Core Logic: "The Smart Override"
The engine uses a sophisticated rule-based system to forgive high utilization if the user chooses a sustainable EMI tenure. If the monthly burden ratio is low (< 5%) and the tenure is long (9+ months), the system provides a "Smart Choice" bonus, turning a potential Orange/Red signal into a Green one.

---

## 📄 License
This project is for educational and demo purposes.
