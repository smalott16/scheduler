import React from 'react';
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
  
  const dayItems = days.map((item) => {
    return(
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === value}
        setDay={onChange} 
      />
    )
  })

  return (
    <ul>
      {dayItems}
    </ul>
  );
}