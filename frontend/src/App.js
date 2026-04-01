import React, { useState } from 'react';

function App() {
  // --- DEMO CONFIGURATION STATE ---
  const [creditLimit, setCreditLimit] = useState(100000); 
  const [currentDebt, setCurrentDebt] = useState(35); // Default 35% as per your test
  const [price, setPrice] = useState(19990);          // Default Headphone Price

  // Transaction State
  const [method, setMethod] = useState("Credit Card");
  const [bank, setBank] = useState("HDFC Bank"); 
  const [emiMonths, setEmiMonths] = useState(3); // Default 3 months
  const [analysis, setAnalysis] = useState(null);

  const checkImpact = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/analyze_purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_utilization: parseInt(currentDebt),
          credit_limit: parseInt(creditLimit),
          item_price: parseInt(price),
          payment_method: method,
          emi_months: parseInt(emiMonths),
          bank_name: bank
        })
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      alert("Error: Backend is offline.");
    }
  };

  const handleProceed = () => {
    alert("Transaction Processed!");
    setAnalysis(null);
  };

  const getColor = (signal) => {
    if (signal === "RED") return "#B12704"; 
    if (signal === "ORANGE") return "#FFA41C"; 
    return "#007600"; 
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#eaeded", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      
      {/* PHONE FRAME */}
      <div style={{ width: "375px", height: "850px", background: "white", borderRadius: "30px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", position: "relative", overflow: "hidden", border: "12px solid #111" }}>
        
        {/* --- AMAZON HEADER --- */}
        <div style={{ background: "#232f3e", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
          <div style={{ fontWeight: "bold", fontSize: "20px", letterSpacing: "-1px" }}>amazon<span style={{color:"#F08804"}}>.in</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ textAlign: "right", fontSize: "12px" }}>
              <span style={{ display: "block", opacity: 0.8 }}>Delivering to</span>
              <strong>Rohan</strong>
            </div>
            <div style={{ width: "35px", height: "35px", background: "#ddd", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#333" }}>👤</div>
          </div>
        </div>

        {/* --- DEMO CONTROL PANEL (Sticky Top) --- */}
        <div style={{ background: "#f8f9fa", padding: "10px", borderBottom: "1px solid #ccc", fontSize: "10px" }}>
          <strong style={{ display: "block", marginBottom: "5px", color: "#555" }}>⚙️ DEMO CONFIGURATION</strong>
          
          {/* Slider 1: Credit Limit */}
          <div style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{width: "80px"}}>Limit: ₹{parseInt(creditLimit).toLocaleString()}</span>
            <input type="range" min="10000" max="200000" step="5000" value={creditLimit} onChange={(e)=>setCreditLimit(e.target.value)} style={{flex:1}} />
          </div>

          {/* Slider 2: Current Debt */}
          <div style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{width: "80px"}}>Debt: {currentDebt}%</span>
            <input type="range" min="0" max="90" value={currentDebt} onChange={(e)=>setCurrentDebt(e.target.value)} style={{flex:1}} />
          </div>

          {/* Slider 3: Item Price */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{width: "80px"}}>Price: ₹{parseInt(price).toLocaleString()}</span>
            <input type="range" min="1000" max="100000" step="1000" value={price} onChange={(e)=>setPrice(e.target.value)} style={{flex:1}} />
          </div>
        </div>

        {/* --- PRODUCT SECTION --- */}
        <div style={{ padding: "15px", overflowY: "auto", height: "550px" }}>
          
          <div style={{ textAlign: "center", padding: "10px 0" }}>
             <img src="https://placehold.co/400x300/EEE/31343C?text=Sony+Headphones" alt="Demo Headphones" style={{ maxHeight: "150px", maxWidth: "100%", borderRadius: "8px" }}/>
          </div>

          <h2 style={{ fontSize: "16px", lineHeight: "1.4", marginBottom: "5px", color: "#0F1111" }}>
            Sony WH-1000XM5 Wireless Noise Cancelling Headphones
          </h2>
          <div style={{ fontSize: "24px", color: "#B12704", marginBottom: "15px" }}>
            <span style={{ fontSize: "14px", color: "#565959", verticalAlign: "top" }}>₹</span>{parseInt(price).toLocaleString()}
          </div>

          <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "15px 0" }} />

          {/* --- SMART FORM --- */}
          <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>Payment Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} 
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #888", background: "#f0f2f5", fontSize: "14px", marginBottom: "15px" }}>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="EMI">EMI</option>
            <option value="UPI">UPI</option>
          </select>

          {(method === "Credit Card" || method === "EMI") && (
            <div style={{ animation: "fadeIn 0.3s" }}>
              <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>Select Bank Card</label>
              <select value={bank} onChange={(e) => setBank(e.target.value)} 
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #888", background: "#f0f2f5", fontSize: "14px", marginBottom: "15px" }}>
                <option value="HDFC Bank">HDFC Bank (16%)</option>
                <option value="SBI Card">SBI Card (14%)</option>
                <option value="ICICI Bank">ICICI Bank (15%)</option>
                <option value="Axis Bank">Axis Bank (16%)</option>
              </select>
            </div>
          )}

          {method === "EMI" && (
            <div style={{ marginBottom: "15px", animation: "fadeIn 0.3s" }}>
              <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>EMI Tenure</label>
              <select value={emiMonths} onChange={(e) => setEmiMonths(e.target.value)}
                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #888", background: "#fff", fontSize: "14px" }}>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="9">9 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
              </select>
            </div>
          )}
        </div>

        {/* BOTTOM BUY BUTTON */}
        <div style={{ position: "absolute", bottom: "0", width: "100%", padding: "15px", background: "white", borderTop: "1px solid #ddd" }}>
           <button onClick={checkImpact} 
             style={{ width: "90%", display: "block", margin: "0 auto", padding: "15px", background: "#FFD814", border: "none", borderRadius: "25px", fontSize: "16px", cursor: "pointer", color: "#0F1111" }}>
             Buy Now
           </button>
        </div>

        {/* --- POPUP --- */}
        {analysis && (
          <div style={{ 
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
            background: "rgba(0,0,0,0.7)", zIndex: 100,
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <div style={{ 
              background: "white", width: "85%", borderRadius: "12px", 
              border: `4px solid ${getColor(analysis.signal)}`,
              textAlign: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", animation: "popIn 0.2s", overflow: "hidden" 
            }}>
              
              {(analysis.signal === "RED" || analysis.signal === "ORANGE") && (
                <div style={{ height: "20px", width: "100%", background: "repeating-linear-gradient(45deg, #FFD700, #FFD700 10px, #000 10px, #000 20px)", marginBottom: "15px" }}></div>
              )}

              <div style={{ padding: "0 20px 20px 20px" }}>
                <h2 style={{ margin: "10px 0 5px 0", color: getColor(analysis.signal), textTransform: "uppercase", fontSize: "18px" }}>
                  {analysis.signal === "GREEN" ? "Safe to Proceed" : analysis.signal === "ORANGE" ? "Caution" : "High Risk"}
                </h2>
                <p style={{ color: "#555", fontSize: "13px", margin: "0 0 15px 0" }}>{analysis.message}</p>

                {analysis.financial_details && (
                  <div style={{ background: "#f8f9fa", borderRadius: "8px", padding: "10px", fontSize: "13px", marginBottom: "15px", textAlign: "left" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}><span>Base Price:</span><strong>₹{parseInt(price).toLocaleString()}</strong></div>
                    {analysis.financial_details.Interest > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", color: "#B12704" }}>
                        <span>+ Interest ({analysis.financial_details.Rate}):</span>
                        <strong>₹{analysis.financial_details.Interest}</strong>
                      </div>
                    )}
                    <div style={{ borderTop: "1px solid #ccc", margin: "5px 0" }}></div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "14px" }}><span>Total Pay:</span><strong>₹{analysis.financial_details.Total}</strong></div>
                    {analysis.financial_details.Monthly > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#007600", fontWeight: "bold" }}><span>Monthly EMI:</span><span>₹{analysis.financial_details.Monthly}/mo</span></div>
                    )}
                  </div>
                )}

                {analysis.recommendation && (
                  <div style={{ background: "#e3f2fd", borderLeft: "4px solid #2196f3", padding: "8px", marginBottom: "15px", textAlign: "left", fontSize: "12px", borderRadius: "4px" }}>
                    <strong>💡 AI Tip:</strong> {analysis.recommendation}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {analysis.signal !== "GREEN" && (
                    <button onClick={() => setAnalysis(null)} style={{ padding: "12px", background: "#2ecc71", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>Go Back & Change</button>
                  )}
                  <button onClick={handleProceed} style={{ padding: "12px", background: analysis.signal === "GREEN" ? "#007600" : "transparent", color: analysis.signal === "GREEN" ? "white" : "#555", border: analysis.signal === "GREEN" ? "none" : "2px solid #ccc", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>
                    {analysis.signal === "GREEN" ? "Proceed to Pay" : "Proceed Anyways (Risky)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;