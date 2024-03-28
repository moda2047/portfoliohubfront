import React, { useState, useEffect, useRef } from "react";
import "./css/CalendarMain.css";
import PTCalendar from "../components/calendar/PTCalendar";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import EventList from "../components/event/EventList";
const CalendarMain = () => {
  const [date, setDate] = useState(new Date());
  // 이전 달로 이동하는 함수
  const prevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };
  // 다음 달로 이동하는 함수
  const nextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };

  // 현재 월의 날짜를 계산
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  // 날짜를 표시할 배열 생성
  const calendarDays = [];
  for (let i = 1; i <= daysInMonth + firstDayOfMonth; i++) {
    if (i > firstDayOfMonth) {
      calendarDays.push(i - firstDayOfMonth);
    } else {
      calendarDays.push("");
    }
  }

  return (
    <div className="calendarM">
      <div className="calendar-main">
        <div className="calendar-header">header</div>
        <div className="calendar-body">
          <PTCalendar />
        </div>
      </div>
      <div className="calendar-event">
        <EventList />
      </div>
    </div>
  );
};

export default CalendarMain;
