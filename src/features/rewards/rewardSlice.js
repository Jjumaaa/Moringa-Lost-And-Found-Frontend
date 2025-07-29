import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

const initialState = {
  offeredRewards: [],
  receivedRewards: [],
  loading: false,
  error: null,
};


export const offerReward = createAsyncThunk(
  'reward/offerReward',
  async (rewardData, { rejectWithValue }) => {
    try {
      const response = await API.post('/rewards', rewardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to offer reward');
    }
  }
);

export const payReward = createAsyncThunk(
  'reward/payReward',
  async (rewardId, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/rewards/${rewardId}/pay`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to pay reward');
    }
  }
);

export const fetchRewardHistory = createAsyncThunk(
  'reward/fetchRewardHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/rewards/history');
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch reward history');
    }
  }
);

const rewardSlice = createSlice({
  name: 'reward',
  initialState,
  reducers: {
    clearRewardError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(offerReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(offerReward.fulfilled, (state, action) => {
        state.loading = false;
        state.offeredRewards.push(action.payload); 
      })
      .addCase(offerReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(payReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payReward.fulfilled, (state, action) => {
        state.loading = false;
        state.offeredRewards = state.offeredRewards.map(reward =>
          reward.id === action.payload.id ? action.payload : reward
        );
        
      })
      .addCase(payReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchRewardHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewardHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.offeredRewards = action.payload.offered;
        state.receivedRewards = action.payload.received;
      })
      .addCase(fetchRewardHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRewardError } = rewardSlice.actions;

export const selectReward = (state) => state.reward;

export default rewardSlice.reducer;