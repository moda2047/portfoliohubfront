import React from "react";
import "../css/CalendarCell.css";

const CalendarCell = ({ day, events, onClick }) => {
  return (
    <td className="cellTd" onClick={() => onClick(day)}>
      <div className="dayLabel">{day}</div>
      {events && events.length > 0 && (
        <div className="calenarcellul">
          {events.map((event, index) => (
            <div key={index}>
              <div className="calendarcellli">{event.title}</div>
            </div>
          ))}
        </div>
      )}
    </td>
  );
};

export default CalendarCell;
