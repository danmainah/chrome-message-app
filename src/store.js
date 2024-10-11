import { configureStore, createSlice } from '@reduxjs/toolkit';
import { getMessages as fetchMessagesFromAPI, markMessageAsRead as markAsReadAPI } from './utils/api';
import {saveState, loadState} from './utils/localStorage';

const preloadedState = loadState();
// Initial state
const initialState = {
  messages: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Redux slice for messages
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesLoading(state) {
      state.status = 'loading';
    },
    messagesReceived(state, action) {
      state.status = 'succeeded';
      state.messages = action.payload;
    },
    messagesError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    markAsRead(state, action) {
      const messageId = action.payload;
      const message = state.messages.find(m => m.id === messageId);
      if (message) {
        message.read = true;
      }
    },
  },
});

// Export actions
export const { messagesLoading, messagesReceived, messagesError, markAsRead } = messagesSlice.actions;

// Thunk for fetching messages
export const fetchMessages = () => async (dispatch) => {
  dispatch(messagesLoading());
  try {
    const data = await fetchMessagesFromAPI();
    dispatch(messagesReceived(data.messages));
  } catch (err) {
    dispatch(messagesError(err.toString()));
  }
};

// Thunk for marking message as read
export const markMessageAsRead = (id) => async (dispatch) => {
  markAsReadAPI(id);
  dispatch(markAsRead(id));
};

// Configure store
const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
})

export default store;
