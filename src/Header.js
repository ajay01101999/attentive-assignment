import React, { useContext } from "react";
import { Typography, Button } from "antd";
import { modalData } from "./App";

const Header = () => {
  const modal1 = useContext(modalData);
  return (
    <div>
      <Typography>
        <h1
          style={{
            margin: "20px",
            backgroundColor: "lightgray",
            borderRadius: "8px",
            padding: "10px",
            color: "white",
          }}
        >
          Table using Ant design
        </h1>
      </Typography>
      <Button
        style={{ marginRight: "20px" }}
        type="primary"
        onClick={() => {
          modal1.setModal(!modal1.modal);
        }}
      >
        Add Task
      </Button>
      <Button
        type="danger"
        disabled={modal1.disabled}
        onClick={modal1.handleMultiDelete}
      >
        Delete Selected
      </Button>
    </div>
  );
};

export default Header;
