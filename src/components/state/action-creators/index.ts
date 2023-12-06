import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";

interface DepositAction {
  type: ActionType.DEPOSIT;
  payload: number;
}

export const depositMoney = (amount: number): DepositAction => ({
  type: ActionType.DEPOSIT,
  payload: amount,
});

interface WithdrawAction {
  type: ActionType.WITHDRAW;
  payload: number;
}

export const withdrawMoney = (amount: number): WithdrawAction => ({
  type: ActionType.WITHDRAW,
  payload: amount,
});

export const showList = (
  amount: number,
  text: string,
  date: string,
  category: string,
  parentCategory: string
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        id: Math.floor(Math.random() * 10000),
        text,
        amount,
        date,
        category,
        parentCategory,
      },
    });
  };
};

export const addCategory = (categories: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "ADD_CATEGORY",
      payload: categories,
    });
  };
};

export const setLimit = (limit: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "SET_LIMIT",
      payload: limit,
    });
  };
};

export const setPage = (page: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "SET_PAGE",
      payload: page,
    });
  };
};

export const showTransactions = (list: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SHOW,
      payload: list,
    });
  };
};

export const bankrupt = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BANKRUPT,
    });
  };
};
