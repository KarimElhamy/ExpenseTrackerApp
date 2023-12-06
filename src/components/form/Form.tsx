import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Card,
  CardActions,
  CardContent,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
  Alert,
  AlertTitle,
  Snackbar,
  Tooltip,
  Grid,
} from "@mui/material";
import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";
import { actionCreators } from "../state";
import { RootState } from "../state/reducers";
import History from "../utils/History";

interface IFormInput {
  cashAmount: number;
  category: string;
  notes: string;
  date: string;
}

export const Form: React.FC<{ category: string }> = (props) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const dispatch = useDispatch();

  const { depositMoney, setLimit, showList, setPage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const categoryState = useSelector((state: RootState) => state.categoriesList);
  const limitState = useSelector((state: RootState) => state.limit);
  const pageState = useSelector((state: RootState) => state.page);

  const [open, setOpen] = React.useState(false);

  const [cashValue, setCashValue] = useState<number>(0);
  let [workBalance, setWorkBalance] = useState<number>(0);
  let [homeBalance, setHomeBalance] = useState<number>(0);
  let [generalBalance, setGeneralBalance] = useState<number>(0);

  let [income, setIncome] = useState<number>(0);
  let [expense, setExpense] = useState<number>(0);

  let [incomeWork, setIncomeWork] = useState<number>(0);
  let [expenseWork, setExpenseWork] = useState<number>(0);

  let [incomeGeneral, setIncomeGeneral] = useState<number>(0);
  let [expenseGeneral, setExpenseGeneral] = useState<number>(0);

  let [limit, setBudgetLimit] = useState<number>(0);

  const [notes, setNotes] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<string>("");

  const [show, setShow] = React.useState<boolean>(false);

  let [categorySelected, setCategorySelected] = React.useState<string>("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategorySelected(event.target.value as string);
  };

  const handleInitialData = () => {
    setPage("general");
    setLimit(limit);
    depositMoney(cashValue);
  };

  const onSubmit = () => {
    depositMoney(cashValue);
    setWorkBalance((workBalance += cashValue));
    setShow(true);

    if (cashValue > 0) {
      setIncomeWork((incomeWork += cashValue));
    } else {
      setExpenseWork((expenseWork -= cashValue));
    }

    if (expenseWork >= limitState) {
      setOpen(true);
    }

    showList(cashValue, notes, transactionDate, categorySelected, "work");
  };

  const onSubmitGeneral = () => {
    depositMoney(cashValue);
    setGeneralBalance((generalBalance += cashValue));
    setShow(true);

    if (cashValue > 0) {
      setIncomeGeneral((incomeGeneral += cashValue));
    } else {
      setExpenseGeneral((expenseGeneral -= cashValue));
    }

    if (expenseGeneral >= limitState) {
      setOpen(true);
    }
    showList(cashValue, notes, transactionDate, categorySelected, "general");
  };

  const onSubmitHome = () => {
    depositMoney(cashValue);
    setHomeBalance((homeBalance += cashValue));
    setShow(true);

    if (cashValue > 0) {
      setIncome((income += cashValue));
    } else {
      setExpense((expense -= cashValue));
    }

    if (expense >= limitState) {
      setOpen(true);
    }
    showList(cashValue, notes, transactionDate, categorySelected, "home");
  };

  return (
    <div>
      {pageState === "work" ? (
        <div>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              style={{ marginTop: "200px" }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={10000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                You have exceeded your Expenses limit
              </Alert>
            </Snackbar>
          </Stack>
          <div className="inc-exp-container">
            <div style={{ border: "none" }}>
              <h4>Total Balance</h4>
              <p className={workBalance > 0 ? "money-plus" : "money-minus"}>
                ${workBalance.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="inc-exp-container">
            <div>
              <h4>Income</h4>
              <p className="money-plus">${incomeWork.toFixed(2)}</p>
            </div>
            <div>
              <h4>
                Expense
                <span className="limit-text">(Limit: ${limit.toFixed(2)})</span>
              </h4>
              <p className="money-minus">${expenseWork.toFixed(2)}</p>
            </div>
          </div>
          <div className="hide-all">
            <History show={show} pCategory="work" />
          </div>
          <div className="flex-container">
            <div className="flex-child">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Amount
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Amount"
                      onChange={(e) => setCashValue(parseFloat(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormControl style={{ width: "75%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categorySelected}
                      label="Category"
                      onChange={handleChange}
                    >
                      {categoryState.categories?.map((a) => (
                        <MenuItem value={a}>{a}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <TextField
                  type="string"
                  variant="outlined"
                  color="secondary"
                  label="Notes"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Date"
                  onChange={(e) => setTransactionDate(e.target.value)}
                  value={transactionDate}
                  sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="secondary" type="submit">
                  Add Expense Details
                </Button>
              </form>
            </div>
            <div className="flex-child">
              <History show={show} pCategory="work" />
            </div>
          </div>
        </div>
      ) : pageState === "home" ? (
        <div>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              style={{ marginTop: "200px" }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={10000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                You have exceeded your Expenses limit
              </Alert>
            </Snackbar>
          </Stack>
          <div className="inc-exp-container">
            <div style={{ border: "none" }}>
              <h4>Total Balance</h4>
              <p className={homeBalance > 0 ? "money-plus" : "money-minus"}>
                ${homeBalance.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="inc-exp-container">
            <div>
              <h4>Income</h4>
              <p className="money-plus">${income.toFixed(2)}</p>
            </div>
            <div>
              <h4>
                Expense
                <span className="limit-text">(Limit: ${limit.toFixed(2)})</span>
              </h4>
              <p className="money-minus">${expense.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex-container">
            <div className="flex-child">
              <form onSubmit={handleSubmit(onSubmitHome)}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Amount
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Amount"
                      onChange={(e) => setCashValue(parseFloat(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormControl style={{ width: "75%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categorySelected}
                      label="Category"
                      onChange={handleChange}
                    >
                      {categoryState.categories?.map((a) => (
                        <MenuItem value={a}>{a}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <TextField
                  type="string"
                  variant="outlined"
                  color="secondary"
                  label="Notes"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Date"
                  onChange={(e) => setTransactionDate(e.target.value)}
                  value={transactionDate}
                  sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="secondary" type="submit">
                  Add Expense Details
                </Button>
              </form>
            </div>
            <div className="flex-child">
              <History show={show} pCategory="home" />
            </div>
          </div>
        </div>
      ) : pageState === "general" ? (
        <div>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              style={{ marginTop: "200px" }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={10000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                You have exceeded your Expenses limit
              </Alert>
            </Snackbar>
          </Stack>
          <div className="inc-exp-container">
            <div style={{ border: "none" }}>
              <h4>Total Balance</h4>
              <p className={generalBalance > 0 ? "money-plus" : "money-minus"}>
                ${generalBalance.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="inc-exp-container">
            <div>
              <h4>Income</h4>
              <p className="money-plus">${incomeGeneral.toFixed(2)}</p>
            </div>
            <div>
              <h4>
                Expense
                <span className="limit-text">(Limit: ${limit.toFixed(2)})</span>
              </h4>
              <p className="money-minus">${expenseGeneral.toFixed(2)}</p>
            </div>
          </div>
          <div className="hide-all">
            <History show={show} pCategory="general" />
          </div>
          <div className="hide-all">
            <History show={show} pCategory="general" />
          </div>
          <div className="flex-container">
            <div className="flex-child">
              <form onSubmit={handleSubmit(onSubmitGeneral)}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Amount
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Amount"
                      onChange={(e) => setCashValue(parseFloat(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormControl style={{ width: "75%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categorySelected}
                      label="Category"
                      onChange={handleChange}
                    >
                      {categoryState.categories?.map((a) => (
                        <MenuItem value={a}>{a}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <TextField
                  type="string"
                  variant="outlined"
                  color="secondary"
                  label="Notes"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Date"
                  onChange={(e) => setTransactionDate(e.target.value)}
                  value={transactionDate}
                  sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="secondary" type="submit">
                  Add Expense Details
                </Button>
              </form>
            </div>
            <div className="flex-child">
              <History show={show} pCategory="general" />
            </div>
          </div>
        </div>
      ) : pageState === "entry" ? (
        <div className="inc-exp-container max-height-300">
          <form onSubmit={handleSubmit(handleInitialData)}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Enter Your Budget
                </InputLabel>
                <Tooltip title="Set your starting budget">
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    onChange={(e) => setCashValue(parseFloat(e.target.value))}
                  />
                </Tooltip>
              </FormControl>

              <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Enter Your limit
                </InputLabel>
                <Tooltip title="Set your expenses limit">
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
                  />
                </Tooltip>
              </FormControl>
            </Stack>
            <Button variant="outlined" color="secondary" type="submit">
              Set Your Data
            </Button>
          </form>
        </div>
      ) : (
        <div className="inc-exp-container max-height-300">
          <form onSubmit={handleSubmit(handleInitialData)}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Enter Your Budget
                </InputLabel>
                <Tooltip title="Set your starting budget">
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    onChange={(e) => setCashValue(parseFloat(e.target.value))}
                  />
                </Tooltip>
              </FormControl>

              <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Enter Your limit
                </InputLabel>
                <Tooltip title="Set your expenses limit">
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
                  />
                </Tooltip>
              </FormControl>
            </Stack>
            <Button variant="outlined" color="secondary" type="submit">
              Set Your Data
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
