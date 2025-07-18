import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, reportLostItem, reportFoundItem, getMyReports, claimItem, getInventory, updateItem, deleteItem } from '../services/api';

export const thunkFetchItems = createAsyncThunk('items/fetchItems', async (_, { rejectWithValue }) => {
  try {
    const response = await getItems();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkReportLostItem = createAsyncThunk('items/reportLost', async (data, { rejectWithValue }) => {
  try {
    const response = await reportLostItem(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkReportFoundItem = createAsyncThunk('items/reportFound', async (data, { rejectWithValue }) => {
  try {
    const response = await reportFoundItem(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkFetchMyReports = createAsyncThunk('items/fetchMyReports', async (_, { rejectWithValue }) => {
  try {
    const response = await getMyReports();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkClaimItem = createAsyncThunk('items/claimItem', async (id, { rejectWithValue }) => {
  try {
    const response = await claimItem(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkFetchInventory = createAsyncThunk('items/fetchInventory', async (_, { rejectWithValue }) => {
  try {
    const response = await getInventory();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkUpdateItem = createAsyncThunk('items/updateItem', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await updateItem(id, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const thunkDeleteItem = createAsyncThunk('items/deleteItem', async (id, { rejectWithValue }) => {
  try {
    await deleteItem(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [
      {
        id: 1,
        name: 'Canon DSLR Camera',
        status: 'Found',
        location: 'Lecture Hall 3',
        date: '12/06/2023',
        storage: 'Admin Office',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
      },
      {
        id: 2,
        name: 'Apple Watch',
        status: 'Pending',
        location: 'Cafeteria',
        date: '10/06/2023',
        storage: 'Security Desk',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2d55e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
      },
      {
        id: 3,
        name: 'Samsung Galaxy S21',
        status: 'Returned',
        location: 'Library',
        date: '05/06/2023',
        storage: 'Admin Office',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkFetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(thunkFetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkReportLostItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkReportLostItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(thunkReportLostItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkReportFoundItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkReportFoundItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(thunkReportFoundItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkFetchMyReports.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(thunkClaimItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(thunkFetchInventory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(thunkUpdateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(thunkDeleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false;
      });
  },
});

export default itemSlice.reducer;