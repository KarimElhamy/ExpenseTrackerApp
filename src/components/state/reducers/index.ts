import { combineReducers } from "redux";
import transactionReducer from "./transactionReducer";
import transactionDetailsReducer from "./transactionListReducer";
import categoriesReducer from "./categoryReducer";
import limitReducer from "./limitReducer";
import pageReducer from "./pageReducer";

const reducers = combineReducers({
  transaction: transactionReducer,
  transactionList: transactionDetailsReducer,
  categoriesList: categoriesReducer,
  limit: limitReducer,
  page: pageReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
