import React, { useState } from "react";
// import "../../src/App.css";
import "../App.css";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/reducers";
import NavBar from "./utils/NavBar";
import { Details } from "@mui/icons-material";
import { Form } from "./form/Form";
import Button from "@mui/material-next/Button";
import Popup from "./utils/Popup";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "./state";

export enum Pages {
  ENTRY = "entry",
  GENERAL = "general",
  HOME = "home",
  WORK = "work",
  GeneralExpenses = "General Expenses",
  HomeExpenses = "Home Expenses",
  SetLimit = "Set Limit And Budget",
  WorkExpenses = "Work Expenses",
}

function HomePage() {
  const state = useSelector((state: RootState) => state.transaction);

  const dispatch = useDispatch();

  const { setPage } = bindActionCreators(actionCreators, dispatch);

  const pageState = useSelector((state: RootState) => state.page);

  const [category, setCategory] = React.useState<string>("");

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setPage(cat);
  };

  return (
    <div className="background">
      <NavBar />
      <div className="background">
        <div
          style={{
            backgroundColor: "#171717",
            color: "white",
            marginBottom: "15px",
          }}
          className="inc-exp-container"
        >
          <div style={{ border: "none" }}>
            <h4>Total Balance</h4>
            <div style={{ color: "white", fontSize: "35px" }}>
              <div className="div-sidexside" style={{ fontSize: "20px" }}>
                $
              </div>
              <div className="div-sidexside">{state.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div>
          <Button
            id="btnHome"
            onClick={() => handleCategorySelect(Pages.HOME)}
            size="medium"
            variant="elevated"
            style={{
              margin: "5px",
              backgroundColor: pageState == Pages.HOME ? "#1876d1" : "white",
              color: pageState == Pages.HOME ? "white" : "#6650a4",
            }}
          >
            {Pages.HomeExpenses}
          </Button>
          <Button
            id="btnGeneralPage"
            className="Btn"
            onClick={() => handleCategorySelect(Pages.GENERAL)}
            size="medium"
            variant="elevated"
            style={{
              margin: "5px",
              backgroundColor: pageState == Pages.GENERAL ? "#1876d1" : "white",
              color: pageState == Pages.GENERAL ? "white" : "#6650a4",
            }}
          >
            {Pages.GeneralExpenses}
          </Button>

          <Button
            id="btnWork"
            className="Btn"
            onClick={() => handleCategorySelect(Pages.WORK)}
            size="medium"
            variant="elevated"
            style={{
              margin: "5px",
              backgroundColor: pageState == Pages.WORK ? "#1876d1" : "white",
              color: pageState == Pages.WORK ? "white" : "#6650a4",
            }}
          >
            {Pages.WorkExpenses}
          </Button>
        </div>
        <Button
          id="btnEntry"
          onClick={() => handleCategorySelect(Pages.ENTRY)}
          size="medium"
          variant="elevated"
          style={{
            margin: "5px",
            backgroundColor: pageState == Pages.ENTRY ? "#1876d1" : "white",
            color: pageState == Pages.ENTRY ? "white" : "#6650a4",
          }}
        >
          {Pages.SetLimit}
        </Button>
        <Popup />
        <Form category={category} />
      </div>
    </div>
  );
}

export default HomePage;
