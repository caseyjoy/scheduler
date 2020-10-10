// a generic component for making lists of things
import React from "react";

export default function List(props) {
  const ListItem = props.listItem;

  if (props.items) {
    // create an array of ListItem, using the props we added.
    // props.compare is the property we compare to the current value to see if it's actually the right thing  
    // if props.spread is true, spread the properties in item into the ListItem

    // TODO: figure out why DayList wants spread enabled - what in item is it using?

    const listOfItems =
      props.items !== []
        ? props.items.map((item, index) => (
            <ListItem
              key={props.type + item.id + index}
              selected={item[props.compare] === props.value}
              onChange={props.onChange}
              {...(props.spread && item)}
            />
          ))
        : [];

    // returned in a fragment because the component calling this should always put them in something else
    return <>{listOfItems}</>;
  } else {
    // had to return something to get it to not crash when there were no props
    return <></>
  }
}
