import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';
import commentsReducer from '../features/comments/commentSlice';
import usersReducer from '../features/users/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['posts', 'comments', 'users'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: usersReducer
}));

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const saveStateToLocalStorage = () => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const preloadedState = loadStateFromLocalStorage();
if (preloadedState) {
  store.dispatch({ type: 'HYDRATE', payload: preloadedState });
}

store.subscribe(() => {
  saveStateToLocalStorage();
});
