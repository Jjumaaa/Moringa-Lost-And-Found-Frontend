import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkFetchActivities } from '../store/activitySlice';
import { FaCheck, FaGift, FaExclamation } from 'react-icons/fa';

const RecentActivity = () => {
  const dispatch = useDispatch();
  const { activities, loading } = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(thunkFetchActivities());
  }, [dispatch]);

  return (
    <div className="recent-activity">
      <div className="recent-activity-header">
        <h2>Recent Activity</h2>
      </div>
      <div className="recent-activity-list">
        {loading ? (
          <div className="animate-pulse">Loading...</div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'returned' && <FaCheck />}
                {activity.type === 'reward' && <FaGift />}
                {activity.type === 'reported' && <FaExclamation />}
              </div>
              <div className="activity-details">
                <div className="activity-header">
                  <p>{activity.title}</p>
                  <time>{activity.time}</time>
                </div>
                <p>{activity.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;