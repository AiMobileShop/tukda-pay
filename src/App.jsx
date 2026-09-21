import React, { useState } from 'react';
import QRCodeCard from './components/QRCodeCard';
import './index.css';

function App() {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [chunks, setChunks] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!upiId || !amount || isNaN(amount) || amount <= 0) return;

    const total = parseFloat(amount);
    const MAX_CHUNK = 1999;
    const newChunks = [];

    let remaining = total;
    while (remaining > 0) {
      if (remaining >= MAX_CHUNK) {
        newChunks.push(MAX_CHUNK);
        remaining -= MAX_CHUNK;
      } else {
        newChunks.push(parseFloat(remaining.toFixed(2)));
        remaining = 0;
      }
    }
    setChunks(newChunks);
  };

  return (
    <div className="app-container">
      <header className="hero">
        <h1 className="gradient-text">Tukda Pay</h1>
        <p>Break down large payments into smaller chunks.</p>
      </header>

      <main>
        <section className="input-section glass-panel">
          <form onSubmit={handleGenerate} className="payment-form">
            <div className="form-group">
              <label htmlFor="upiId">UPI ID</label>
              <input
                type="text"
                id="upiId"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Total Amount (₹)</label>
              <input
                type="number"
                id="amount"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="0.01"
                required
              />
            </div>
            <button type="submit" className="generate-btn">
              Generate QR Codes
            </button>
          </form>
        </section>

        {chunks.length > 0 && (
          <section className="results-section">
            <h2 className="results-title">Your Payment QR Codes</h2>
            <div className="qr-grid">
              {chunks.map((chunk, idx) => (
                <QRCodeCard
                  key={idx}
                  amount={chunk}
                  upiId={upiId}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
