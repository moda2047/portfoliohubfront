import React, { useState, useEffect, useRef } from "react";
import "./css/CalendarMain.css";
import PTCalendar from "../components/calendar/PTCalendar";
import EventList from "../components/event/EventList";
const CalendarMain = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickDate, setClickDate] = useState(new Date());
  const [enterEvent, setEnterEvent] = useState(false);
  const getclick = (day) => {
    setClickDate(day);
  };
  return (
    <>
      <div className="calendarM">
        <div className="calendar-main">
          <div className="calendar-body">
            <PTCalendar
              maindate={currentDate}
              getclick={getclick}
              enterEvent={enterEvent}
              setEnterEvent={setEnterEvent}
            />
          </div>
        </div>
        <div className="calendar-event">
          <EventList
            maindate={clickDate}
            enterEvent={enterEvent}
            setEnterEvent={setEnterEvent}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarMain;
