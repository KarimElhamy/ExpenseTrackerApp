import { string } from "yup";
import { ActionType } from "../action-types/index";
import { Action } from "../actions";

export interface limitState {
  limit: number;
}
const initialState = {
  limit: 0,
};

const limitReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_LIMIT":
      return action.payload;

    default:
      return state;
  }
};

export default limitReducer;
