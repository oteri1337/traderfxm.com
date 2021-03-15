const defaultState = { array: [], object: {}, search_keys: {} };

function usersReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_USERS":
      return action.data;
    case "UPDATE_USER_IN_USERS":
      return {
        ...state,
        object: {
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_USERS_PAGE":
      return {
        ...action.data,
        array: [...state.array, ...action.data.array],
      };
    default:
      return state;
  }
}

export default usersReducer;
