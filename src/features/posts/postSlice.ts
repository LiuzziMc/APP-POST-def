import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, Post } from '../../interfaces/PostInterfaces';
import axios from 'axios';

export interface IpropApi {
  start: number;
  limit: number;
  title?: string;
}

// Azione asincrona per il recupero dei post
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (props: IpropApi, thunkAPI) => {
  try {
    const linkApi = `https://jsonplaceholder.typicode.com/posts?_start=${props.start}&_limit=${props.limit}${props.title ? `&title=${props.title}` : ''}`;
    const response = await axios.get(linkApi);
    console.log('Dati di risposta:', response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Errore nel fetch dei post');
  }
});

// Funzione per caricare i preferiti dal localStorage
const loadFavoritesFromLocalStorage = () => {
  const favoritesFromLocalStorage = localStorage.getItem('favorites');
  return favoritesFromLocalStorage ? JSON.parse(favoritesFromLocalStorage) : [];
};

// Stato iniziale
const initialState = {
  data: [],
  status: 'idle',
  error: null as string | null,
  favorites: loadFavoritesFromLocalStorage(),
  openPost: null as Post | null,
  comments: {} as Record<number, Comment[]>,
  search: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Toggle tra preferito e non preferito per un post
    toggleFavorite: (state, action) => {
      const postId = action.payload;
      const index = state.favorites.indexOf(postId);

      if (index !== -1) {
        state.favorites.splice(index, 1); // Rimuovi dai preferiti se già presente
      } else {
        state.favorites.push(postId); // Aggiungi ai preferiti se non presente
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    // Apertura un post
    openPost: (state, action) => {
      state.openPost = action.payload;
    },

    // Modifica dello stato della ricerca
    setSearchQuery: (state, action) => {
      state.search = action.payload; 
    },

    // Aggiunta di un commento a un post
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].push(comment);
    },

    // Rimozione di un commento da un post
    removeComment: (state, action) => {
      const { postId, commentId } = action.payload;
      if (state.comments[postId]) {
        state.comments[postId] = state.comments[postId].filter((comment) => comment.id !== commentId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string | null;
      });
  },
});

export const { toggleFavorite, openPost, addComment, removeComment, setSearchQuery } = postsSlice.actions;
export default postsSlice.reducer;
