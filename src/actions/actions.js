export const nextGameAction = (item, state) => {
  return {
    type: "NEXT_GAME",
    payload: item,
    actionState: state
  };
};

export const decrementAction = (item, state) => {
  return {
    type: "DECREMENT",
    payload: item,
    actionState: state
  };
};

export const getResultAction = (result, state) => {
  return {
    type: "GET_RESULT",
    payload: result,
    actionState: state
  };
};

// export const setLoading = () => {
//   return {
//     type: "SET_LOADING",
//     payload: true
//   };
// };
