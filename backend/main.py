# backend/main.py (The "Smart Override" Version)
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BANK_RATES = {
    "HDFC Bank": 16.0,
    "SBI Card": 14.0,
    "ICICI Bank": 15.0,
    "Axis Bank": 16.0
}

class TransactionRequest(BaseModel):
    current_utilization: int
    credit_limit: int
    item_price: int
    payment_method: str
    emi_months: int = 6
    bank_name: str = "HDFC Bank"

@app.post("/analyze_purchase")
def analyze_transaction(data: TransactionRequest):
    signal = "GREEN"
    impact_level = "None"
    message = "Safe transaction."
    recommendation = None
    breakdown = {}

    annual_rate = BANK_RATES.get(data.bank_name, 16.0)

    # --- 1. DEBIT / UPI ---
    if data.payment_method in ["Debit Card", "UPI"]:
        message = "Using own funds. Zero impact on credit score."
        breakdown = {
            "Principal": data.item_price,
            "Interest": 0,
            "Total": data.item_price,
            "Monthly": 0,
            "Rate": "0%"
        }

    # --- 2. CREDIT CARD / EMI ---
    else:
        # A. Calculate Interest & Monthly Payment
        if data.payment_method == "EMI":
            interest_amount = data.item_price * (annual_rate / 100) * (data.emi_months / 12)
            total_repayment = data.item_price + interest_amount
            monthly_payment = total_repayment / data.emi_months
            rate_label = f"{annual_rate}%"
        else:
            interest_amount = 0
            total_repayment = data.item_price
            monthly_payment = data.item_price
            rate_label = "0%"

        # B. Calculate Ratios
        # Utilization (Full principal is blocked)
        added_utilization = (data.item_price / data.credit_limit) * 100
        new_utilization = data.current_utilization + added_utilization
        
        # Burden (Monthly payment vs Limit)
        burden_ratio = (monthly_payment / data.credit_limit) * 100

        # --- C. THE LOGIC ENGINE (Updated) ---
        
        # 1. Critical Danger Zone (Always RED)
        if new_utilization > 80:
            signal = "RED"
            impact_level = "Critical: Maxed Out Card"
            message = f"Danger: Debt hits {int(new_utilization)}%. Score will drop sharply."
            recommendation = "Do not proceed. Use Debit Card."
        
        # 2. Warning Zone (30% - 80%)
        elif new_utilization > 30:
            # Default to Orange
            signal = "ORANGE"
            impact_level = "High Utilization"
            message = f"Warning: Total debt {int(new_utilization)}% crosses safety line."
            recommendation = "Try a longer EMI tenure to reduce impact."

            # --- SMART OVERRIDE (The Fix) ---
            # If user picks EMI > 9 months AND burden is low (< 5%), forgive the utilization
            if data.payment_method == "EMI" and data.emi_months >= 9 and burden_ratio < 5:
                signal = "GREEN"
                impact_level = "Safe (Long Tenure Bonus)"
                message = f"Smart Choice: 12+ months tenure keeps monthly burden low ({int(burden_ratio)}%), despite high utilization."
                recommendation = None

        # 3. Monthly Burden Check (For short EMIs)
        # If Utilization was safe, but Burden is huge (e.g. 3 months tenure)
        if signal == "GREEN" and burden_ratio > 15:
            signal = "ORANGE"
            impact_level = "High Monthly Payment"
            message = f"Risk: ₹{int(monthly_payment)}/mo is too steep."
            recommendation = "Switch to 9 or 12 months."

        # Breakdown Data
        breakdown = {
            "Principal": data.item_price,
            "Interest": int(interest_amount),
            "Total": int(total_repayment),
            "Monthly": int(monthly_payment),
            "Rate": rate_label
        }

    return {
        "signal": signal,
        "impact_level": impact_level,
        "message": message,
        "recommendation": recommendation,
        "financial_details": breakdown
    }