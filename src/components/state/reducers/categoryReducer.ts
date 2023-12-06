import { string } from "yup";
import { ActionType } from "../action-types/index";
import { Action } from "../actions";

export interface categoryState {
  categories: string;
}
const initialState = {
  categories: ["Entertainment", "Electronics", "Transportation"],
};

const categoriesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    default:
      return state;
  }
};

export default categoriesReducer;
