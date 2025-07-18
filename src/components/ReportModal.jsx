import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkReportLostItem } from '../store/itemSlice';
import { FaTimes } from 'react-icons/fa';

const ReportModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    lostDate: '',
    location: '',
    description: '',
    reward: false,
    rewardAmount: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkReportLostItem(formData));
    closeModal();
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Report Lost Item</h3>
          <button onClick={closeModal} className="close-modal-btn">
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="item-name">Item Name</label>
              <input
                type="text"
                id="item-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. MacBook Pro, Wallet, etc."
              />
            </div>
            <div className="form-group">
              <label htmlFor="item-category">Category</label>
              <select
                id="item-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="documents">Documents</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lost-date">Date Lost</label>
              <input
                type="date"
                id="lost-date"
                name="lostDate"
                value={formData.lostDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lost-location">Location</label>
              <select
                id="lost-location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Select location</option>
                <option value="lecture-hall-1">Lecture Hall 1</option>
                <option value="lecture-hall-2">Lecture Hall 2</option>
                <option value="library">Library</option>
                <option value="cafeteria">Cafeteria</option>
                <option value="lab-1">Lab 1</option>
                <option value="lab-2">Lab 2</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="item-description">Description</label>
              <textarea
                id="item-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Provide detailed description of the item"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="item-image">Upload Image (if available)</label>
              <div className="image-upload">
                <span className="image-placeholder">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button type="button" className="upload-btn">Upload</button>
              </div>
            </div>
            <div className="form-group">
              <div className="reward-checkbox">
                <input
                  id="offer-reward"
                  type="checkbox"
                  name="reward"
                  checked={formData.reward}
                  onChange={handleChange}
                />
                <label htmlFor="offer-reward">Offer reward for found item</label>
              </div>
              {formData.reward && (
                <div className="reward-amount">
                  <label htmlFor="reward-amount">Reward Amount (Ksh)</label>
                  <input
                    type="number"
                    id="reward-amount"
                    name="rewardAmount"
                    value={formData.rewardAmount}
                    onChange={handleChange}
                    placeholder="1000"
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="submit-btn">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;