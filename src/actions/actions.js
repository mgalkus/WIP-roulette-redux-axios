export const nextGameAction = (item, state) => {
  return {
    type: "NEXT_GAME",
    payload: item,
    actionState: state
  };
};

export const getResultAction = (item, state) => {
  return {
    type: "GET_RESULT",
    payload: item,
    actionState: state
  };
};

export const setLoading = () => {
  return {
    type: "SET_LOADING",
    payload: true
  };
};
