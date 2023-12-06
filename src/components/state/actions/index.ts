import { ActionType } from "../action-types/index";

interface DepositAction {
  type: ActionType.DEPOSIT;
  payload: number;
}

interface WithdrawAction {
  type: ActionType.WITHDRAW;
  payload: number;
}

interface SetLimit {
  type: "SET_LIMIT";
  payload: number;
}

interface SetPage {
  type: "SET_PAGE";
  payload: string;
}

interface AddTransaction {
  type: "ADD_TRANSACTION";
  payload: {
    id: number | any;
    amount: number;
    text: string;
    date: string;
    category: string;
    parentCategory: string;
  };
}

interface AddCategory {
  type: "ADD_CATEGORY";
  payload: string;
}

interface ShowTransactions {
  type: ActionType.SHOW;
  payload: string;
}

interface BankruptAction {
  type: ActionType.BANKRUPT;
}

export type Action =
  | DepositAction
  | AddTransaction
  | SetPage
  | AddCategory
  | WithdrawAction
  | ShowTransactions
  | SetLimit
  | BankruptAction;
