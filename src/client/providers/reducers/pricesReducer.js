const defaultState = { bitcoin: { usd: 7078.52 }, ethereum: { usd: 181.79 } };

function bitcoinReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PRICES":
      return action.data;
    default:
      return state;
  }
}

export default bitcoinReducer;
