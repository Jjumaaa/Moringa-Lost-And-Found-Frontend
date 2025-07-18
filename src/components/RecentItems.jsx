import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkFetchItems } from '../store/itemSlice';
import { FaMapMarkerAlt } from 'react-icons/fa';

const RecentItems = ({ openModal }) => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(thunkFetchItems());
  }, [dispatch]);

  return (
    <div className="recent-items">
      <div className="recent-items-header">
        <h2>Recently Found Items</h2>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="recent-items-list">
        {loading ? (
          <div className="animate-pulse">Loading...</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="recent-item">
              <div className="recent-item-content">
                <img src={item.image} alt={item.name} className="recent-item-image" />
                <div className="recent-item-details">
                  <div className="recent-item-header">
                    <h3>{item.name}</h3>
                    <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                  </div>
                  <p>{`Found in ${item.location} on ${item.date}`}</p>
                  <div className="location">
                    <FaMapMarkerAlt />
                    <span>{item.storage}</span>
                  </div>
                </div>
              </div>
              <div className="recent-item-actions">
                <button
                  className={`action-btn ${item.status === 'Returned' ? 'disabled' : ''}`}
                  disabled={item.status === 'Returned'}
                  onClick={() => openModal()}
                >
                  {item.status === 'Returned' ? 'Claimed' : 'Claim'}
                </button>
                <button className="action-btn details">Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentItems;