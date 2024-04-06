import React, { useState, useEffect, useRef } from "react";
import "./css/CalendarMain.css";
import PTCalendar from "../components/calendar/PTCalendar";
import EventList from "../components/event/EventList";
const CalendarMain = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickDate, setClickDate] = useState(new Date());
  const getclick = (day) => {
    setClickDate(day);
  };
  return (
    <div className="calendarM">
      <div className="calendar-main">
        <div className="calendar-header">header</div>
        <div className="calendar-body">
          <PTCalendar maindate={currentDate} getclick={getclick} />
        </div>
      </div>
      <div className="calendar-event">
        <EventList maindate={clickDate} />
      </div>
    </div>
  );
};

export default CalendarMain;
