import React from 'react';
import './ModalCard.css';

const ModalCard = ({ node, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2>{node.label}</h2>
        <p><strong>Definition:</strong> {node.definition}</p>
        <p><strong>Example:</strong> {node.example}</p>
        <img src={node.diagram} alt={`${node.label} diagram`} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalCard;
