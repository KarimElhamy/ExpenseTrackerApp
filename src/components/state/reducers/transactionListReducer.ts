import { ActionType } from "../action-types/index";
import { Action } from "../actions";

export type First = {
  transactions: {
    id: number;
    text: string;
    amount: number;
    date: string;
    category: string;
    parentCategory: string;
  }[];
};

const initialState = {
  transactions: [],
};

const transactionDetailsReducer = (
  state: First = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [
          ...state.transactions,
          {
            id: action.payload.id,
            text: action.payload.text,
            amount: action.payload.amount,
            date: action.payload.date,
            category: action.payload.category,
            parentCategory: action.payload.parentCategory,
          },
        ],
      };
    default:
      return state;
  }
};

export default transactionDetailsReducer;
