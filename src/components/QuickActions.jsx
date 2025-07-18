import React from 'react';
import { FaExclamationCircle, FaSearch, FaHandHoldingHeart, FaGift } from 'react-icons/fa';

const QuickActions = ({ openModal }) => {
  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <h2>Quick Actions</h2>
      </div>
      <div className="quick-actions-list">
        <button className="action-btn primary" onClick={openModal}>
          <FaExclamationCircle className="mr-2" />
          Report Lost Item
        </button>
        <button className="action-btn secondary">
          <FaSearch className="mr-2" />
          Search Found Items
        </button>
        <button className="action-btn secondary">
          <FaHandHoldingHeart className="mr-2" />
          Report Found Item
        </button>
        <button className="action-btn secondary">
          <FaGift className="mr-2" />
          Offer Reward
        </button>
      </div>
      <div className="reward-offers">
        <div className="reward-offers-header">
          <h2>Active Reward Offers</h2>
        </div>
        <div className="reward-offers-list">
          <div className="reward-offer">
            <h3>MacBook Pro</h3>
            <span>Ksh 5,000</span>
            <p>Lost on 08/06/2023</p>
          </div>
          <div className="reward-offer">
            <h3>AirPods Pro</h3>
            <span>Ksh 2,000</span>
            <p>Lost on 10/06/2023</p>
          </div>
          <div className="reward-offer">
            <h3>Wallet with ID</h3>
            <span>Ksh 1,500</span>
            <p>Lost on 12/06/2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;