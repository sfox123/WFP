export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_API":
      return action.payload;
    default:
      return state;
  }
};
