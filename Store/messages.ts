import { createStore } from 'redux';

const initialState = {
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, { text: action.payload.text, me: action.payload.me }],
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
