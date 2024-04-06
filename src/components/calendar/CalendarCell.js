import React from "react";
import "../css/CalendarCell.css";

const CalendarCell = ({ day, events, onClick }) => {
  return (
    <td onClick={() => onClick(day)}>
      {day}
      {events && events.length > 0 && (
        <ul className="calendarcellul">
          {events.map((event, index) => (
            <li className="calendarcellli" key={index}>
              {event.title}
            </li>
          ))}
        </ul>
      )}
    </td>
  );
};

export default CalendarCell;
