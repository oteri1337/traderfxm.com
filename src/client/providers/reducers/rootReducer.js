import pricesReducer from "./pricesReducer";
import ratesReducer from "./ratesReducer";
import transactionsReducer from "./transactionsReducer";

import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";
import groupsReducer from "./groupsReducer";

import userReducer from "./userReducer";
import walletReducer from "./walletReducer";
import themeReducer from "./themeReducer";

import adminReducer from "./adminReducer";
import usersReducer from "./usersReducer";

function rootReducer(state = {}, action) {
  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    prices: pricesReducer(state?.prices, action),
    rates: ratesReducer(state?.rates, action),
    transactions: transactionsReducer(state?.transactions, action),
    products: productsReducer(state?.products, action),
    cart: cartReducer(state?.cart, action),
    orders: ordersReducer(state?.orders, action),
    groups: groupsReducer(state?.groups, action),
    user: userReducer(state?.user, action),
    wallet: walletReducer(state?.wallet, action),
    theme: themeReducer(state?.theme, action),
    admin: adminReducer(state?.admin, action),
    users: usersReducer(state?.users, action),
  };
}

export default rootReducer;
