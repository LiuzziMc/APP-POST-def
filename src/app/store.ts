import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';
import commentsReducer from '../features/comments/commentSlice';
import usersReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
        posts: postsReducer, 
        comments : commentsReducer,
        users : usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
