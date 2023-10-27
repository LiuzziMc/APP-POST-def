import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Definizione del tipo UserData
interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string
}

export const fetchUserForPost = createAsyncThunk('users/fetchUserForPost', async (userId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
  return response.data[0] as UserData; // Assicurati di specificare il tipo corretto
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { userData: null as UserData | null, status: 'idle', error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserForPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserForPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchUserForPost.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
