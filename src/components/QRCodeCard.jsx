import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeCard = ({ amount, upiId, index }) => {
  const upiString = `upi://pay?pa=${upiId}&am=${amount}&pn=Tukda Pay`;

  return (
    <div className="qr-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="qr-card-header">
        <h3>₹{amount}</h3>
        <p>Part {index + 1}</p>
      </div>
      <div className="qr-code-wrapper">
        <QRCodeSVG value={upiString} size={200} level="M" />
      </div>
      <div className="qr-card-footer">
        <p>Scan to pay</p>
      </div>
    </div>
  );
};

export default QRCodeCard;
