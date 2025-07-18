import React from 'react';
// eslint-disable-next-line no-unused-vars
import { FaBoxOpen, FaCheckCircle, FaClock, FaGift } from 'react-icons/fa';

const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-content">
        <div>
          <p>{title}</p>
          <h3>{value}</h3>
        </div>
        <div className={`stats-icon ${icon.color}`}>{icon.component}</div>
      </div>
      <div className="stats-trend">
        <span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>{`${trend > 0 ? '+' : ''}${trend}% from last week`}</span>
      </div>
    </div>
  );
};

export default StatsCard;