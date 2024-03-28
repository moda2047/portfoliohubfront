import React from "react";

const CalendarCell = ({ day, onClick }) => {
  return <td onClick={() => onClick(day)}>{day}</td>;
};

export default CalendarCell;
