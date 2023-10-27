import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';
import commentsReducer from '../features/comments/commentSlice';
import usersReducer from '../features/users/userSlice';
import draftReducer from '../features/drafts/draftSlice'
import { persistStore, persistReducer, REHYDRATE, FLUSH, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['posts', 'comments', 'users', 'drafts'],

};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: usersReducer,
  drafts: draftReducer
}));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
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
    localStorage.setItem('myReduxState', serializedState); 
  } catch (err) {
    console.log(err);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('myReduxState'); 
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
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

