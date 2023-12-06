import { ActionType } from "../action-types/index";
import { Action } from "../actions";

export interface PageState {
  page: string;
}
const initialState = {
  page: "entry",
};

const pageReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_PAGE":
      return action.payload;

    default:
      return state;
  }
};

export default pageReducer;
