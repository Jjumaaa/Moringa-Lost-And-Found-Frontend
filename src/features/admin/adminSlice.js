import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

const initialState = {
  users: [],
  claims: [],
  adminRewards: [],
  loading: false,
  error: null,
};


export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch users');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await API.delete(`/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete user');
    }
  }
);

export const fetchAllClaims = createAsyncThunk(
  'admin/fetchAllClaims',
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await API.get('/claims');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch claims');
    }
  }
);

export const approveClaim = createAsyncThunk(
  'admin/approveClaim',
  async (claimId, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/claims/${claimId}/approve`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to approve claim');
    }
  }
);

export const fetchAllRewards = createAsyncThunk(
  'admin/fetchAllRewards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/rewards/history');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch all rewards');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = action.payload;
      })
      .addCase(fetchAllClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveClaim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveClaim.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = state.claims.map(claim =>
          claim.id === action.payload.id ? action.payload : claim
        );
      })
      .addCase(approveClaim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllRewards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.adminRewards = [...action.payload.offered, ...action.payload.received];
      })
      .addCase(fetchAllRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;

export const selectAdmin = (state) => state.admin;

export default adminSlice.reducer;