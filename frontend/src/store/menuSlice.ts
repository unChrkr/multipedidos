import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenuData } from '../services/menuService';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'starter' | 'drink' | 'mainCourse' | 'dessert';
}

interface MenuState {
    items: MenuItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MenuState = {
    items: [],
    status: 'idle',
  };
  
  export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    const data = await fetchMenuData();
    return data;
  });
  
  const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMenu.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchMenu.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchMenu.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });
  
  export default menuSlice.reducer;
  
