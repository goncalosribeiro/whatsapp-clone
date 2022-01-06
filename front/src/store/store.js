import React, { createContext, useReducer } from 'react';

const initialState = {
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
