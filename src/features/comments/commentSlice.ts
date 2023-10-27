import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchCommentsForPost = createAsyncThunk('comments/fetchCommentsForPost', async (postId: number, thunkAPI) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Errore nel fetch dei commenti');
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], status: 'idle', error: null as string | null},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsForPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCommentsForPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(fetchCommentsForPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string | null;
      });
  },
});

export { fetchCommentsForPost };
export default commentsSlice.reducer;
