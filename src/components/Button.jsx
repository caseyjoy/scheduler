import React from "react";
import classnames from "classnames";

import "components/Button.scss";
//import { action } from "@storybook/addon-actions";

export default function Button(props) {
  
  //console.log("OUTPUT:", a,func);

  const buttonClass = classnames(
    "button",
    { "button--confirm": props.confirm },
    { "button--danger": props.danger },
    { "button--clickable": props.onClick },
    { "button--disabled": props.disable }
  );

  return (
    <button
      disabled={props.disabled}
      className={buttonClass}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}
