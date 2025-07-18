import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApprovals, approveItem, getReturnedItems } from '../services/api';

export const thunkFetchActivities = createAsyncThunk('activities/fetchActivities', async (_, { rejectWithValue }) => {
  try {
    const response = await getReturnedItems();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkFetchApprovals = createAsyncThunk('activities/fetchApprovals', async (_, { rejectWithValue }) => {
  try {
    const response = await getApprovals();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkApproveItem = createAsyncThunk('activities/approveItem', async (id, { rejectWithValue }) => {
  try {
    const response = await approveItem(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const activitySlice = createSlice({
  name: 'activities',
  initialState: {
    activities: [
      {
        id: 1,
        type: 'returned',
        title: 'Item returned to owner',
        description: 'Samsung Galaxy S21 was successfully returned to Jane Doe after verification.',
        time: '1 hour ago',
      },
      {
        id: 2,
        type: 'reward',
        title: 'Reward payment processed',
        description: 'Ksh 2,000 reward was paid to John Smith for returning lost wallet.',
        time: '3 hours ago',
      },
      {
        id: 3,
        type: 'reported',
        title: 'New item reported',
        description: 'Apple Watch was reported found in the cafeteria. Pending admin approval.',
        time: '5 hours ago',
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkFetchActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
        state.loading = false;
      })
      .addCase(thunkFetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkFetchApprovals.fulfilled, (state, action) => {
        state.activities = action.payload;
        state.loading = false;
      })
      .addCase(thunkApproveItem.fulfilled, (state, action) => {
        const index = state.activities.findIndex((activity) => activity.id === action.payload.id);
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
        state.loading = false;
      });
  },
});

export default activitySlice.reducer;