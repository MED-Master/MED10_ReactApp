import { createStore } from 'redux';

const initialState = {
  progress: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADVANCE':
      return {
        ...state,
        progress: state.progress + 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
