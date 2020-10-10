// a generic component for making lists of things
import React from "react";

export default function List(props) {
  const ListItem = props.listItem;

  const listOfItems =
    props.items !== []
      ? props.items.map((item, index) => (
          <ListItem
            {...(props.spread && item)}
            key={props.type + item.id + index}
            {...item}
            selected={item[props.compare] === props.value}
            onChange={props.onChange}
          />
        ))
      : [];

  return <>{listOfItems}</>;
}
