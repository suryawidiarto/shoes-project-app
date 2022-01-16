import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./ProductQty.scss";

const ProductQty = (props) => {
  const changeHandler = (e) => {
    props.clickHandler(e.target.value);
  };

  return (
    <Box className="qty-container">
      <FormControl fullWidth className="qty-inner-container" size="small">
        <InputLabel id="qty-label" className="qty-label">
          Qty
        </InputLabel>
        <Select
          className="qty-select"
          labelId="qty-label"
          value={props.qtyState}
          label="Qty"
          onChange={changeHandler}
          required
        >
          {props.Qty &&
            Array.from({ length: props.Qty }, (e, i) => i + 1).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductQty;
