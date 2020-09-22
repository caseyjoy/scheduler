import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions";

export default function Button(props) {
  let buttonClass = "button";

  if (props.confirm) buttonClass += " button--confirm";
  if (props.danger) buttonClass += " button--danger";
  if (props.onClick) buttonClass += " button--clickable";
  if (props.disabled) buttonClass += " button--disabled";

  return (
    <button 
    disabled={props.disabled} className={buttonClass} onClick={props.onClick}> {props.children}
    </button>
  );
}
