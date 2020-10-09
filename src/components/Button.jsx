import React from "react";
import classnames from "classnames";

import "components/Button.scss";

// A button that gets used in the Appointment component
export default function Button(props) {
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
