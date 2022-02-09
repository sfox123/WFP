export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_HISTORY":
      return action.payload;
    default:
      return state;
  }
};
