import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./ProductSize.scss";

const ProductSize = (props) => {
  const changeHandler = (e) => {
    props.clickHandler(e.target.value);
  };

  const sizeQtyHandler = (index) => {
    props.sizeQtyHandler(index);
  };

  return (
    <Box className="size-container">
      <FormControl fullWidth className="size-inner-container" size="small">
        <InputLabel id="size-label" className="size-label">
          Size
        </InputLabel>
        <Select
          className="size-select"
          labelId="size-label"
          value={props.sizeState}
          label="Size"
          onChange={changeHandler}
          required
        >
          {props.Size &&
            props.Size.map((item, index) => (
              <MenuItem key={index} value={item.size} onClick={() => sizeQtyHandler(index)}>
                {item.size}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductSize;
