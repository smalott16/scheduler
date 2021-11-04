import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  
  let isfull = false;
  if (spots === 0) {
    isfull = true;
  }

  const formatSpots = (spots) => {
    if (spots === 1) {
      return `${spots} spot`; 
    } else if (spots === 0) {
      return "no spots";
    } else {
      return  `${spots} spots`;
    }
  };

  const styling = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": isfull
  });
  
  return (
    <li className={styling} onClick={() => setDay(name)} selected={selected} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
};