import reducer from "./transactionReducer"; // Update the path accordingly
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { depositMoney, withdrawMoney } from "../action-creators/index";

describe("reducer", () => {
  it("should handle DEPOSIT action", () => {
    const initialState = 100;
    const action = depositMoney(50);
    const newState = reducer(initialState, action);
    expect(newState).toEqual(initialState + 50);
  });

  it("should handle WITHDRAW action", () => {
    const initialState = 100;
    const action = withdrawMoney(30);
    const newState = reducer(initialState, action);
    expect(newState).toEqual(initialState - 30);
  });
});
