import React, { Component } from "react";
import TextField from "@mui/material/TextField";

const Input = (props) => {

  let object = {};

  if (props.shrink) {
    object = {
      shrink: true,
    };
  } console.log('ini adalah', object);

  return (
    <>
      <TextField
        id={props.id}
        type={props.type}
        label={props.label}
        variant={props.variant}
        className={props.className}
        onChange={props.onChange}
        value={props.value}
        InputLabelProps={object}
      />
    </>
  );
};

export default Input;
