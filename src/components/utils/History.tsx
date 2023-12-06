import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { RootState } from "../state/reducers";
import "../form/Form.css";
import Divider from "@mui/material/Divider";
import { ListDivider, ListItem } from "@mui/joy";

type HistoryProps = {
  show: boolean;
  pCategory: string;
};

function History(props: HistoryProps) {
  const stateDetails = useSelector((state: RootState) => state.transactionList);

  const [filteredUsers, setFilteredUsers] = useState(stateDetails.transactions);

  useEffect(() => {
    const filtered = stateDetails.transactions.filter(
      (user) => user.parentCategory === props.pCategory
    );
    setFilteredUsers(filtered);
  }, [stateDetails.transactions]);

  if (props.show) {
    return (
      <div>
        <h3 className="header-border">Transaction History</h3>
        {filteredUsers.map((a) => (
          <ul className="list">
            <span
              style={{
                borderRight:
                  a.amount > 0 ? "10px solid #2ecc71" : "10px solid #c0392b ",
              }}
              key={a.id}
              className="text-center"
            >
              ${a.amount.toFixed(2)}
              <Divider orientation="vertical" flexItem />
              {a.text}
              <Divider orientation="vertical" flexItem />
              {a.date}
              <Divider orientation="vertical" flexItem />
              {a.category}
            </span>
          </ul>
        ))}
      </div>
    );
  } else
    return (
      <div>
        <h3 className="header-border">Transaction History</h3>
      </div>
    );
}

export default History;
