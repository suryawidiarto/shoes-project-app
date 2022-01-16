import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <CircularProgress className="loading-bar" />
    </div>
  );
};

export default Loading;
