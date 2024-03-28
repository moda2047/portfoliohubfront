import React, { useState } from "react";
import CalendarCell from "./CalendarCell";
import "../css/PTCalendar.css";

const PTCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  //처음날짜
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  //마지막 날짜
  const getLastDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  //이전달 이동
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  //다음달 이동
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // 셀 1개 클릭시 이벤트 여기에다가는 왼쪽에 컴포넌트 띄워줘야함.
  const handleCellClick = (day) => {
    alert(
      `Clicked on ${
        currentDate.getMonth() + 1
      }/${day}/${currentDate.getFullYear()}`
    );
  };

  const generateCalendarCells = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const lastDayOfMonth = getLastDayOfMonth(currentDate);
    const totalCells = 7 * 6;
    const calendarCells = [];

    let currentDay = 1;

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarCells.push(<td key={`empty-${i}`}></td>);
    }

    for (let i = firstDayOfMonth; i < totalCells; i++) {
      if (currentDay <= lastDayOfMonth) {
        calendarCells.push(
          <CalendarCell
            key={`day-${currentDay}`}
            day={currentDay}
            onClick={handleCellClick}
          />
        );
        currentDay++;
      } else {
        calendarCells.push(<td key={`empty-${i}`}></td>);
      }
    }

    return calendarCells;
  };

  return (
    <div className="calendar">
      <div className="headerC">
        <img
          src="./images/Back.png"
          alt="back"
          onClick={goToPreviousMonth}
        ></img>

        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <img
          src="./images/Forward.png"
          alt="forward"
          onClick={goToNextMonth}
        ></img>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr>{generateCalendarCells().slice(0, 7)}</tr>
          <tr>{generateCalendarCells().slice(7, 14)}</tr>
          <tr>{generateCalendarCells().slice(14, 21)}</tr>
          <tr>{generateCalendarCells().slice(21, 28)}</tr>
          <tr>{generateCalendarCells().slice(28, 35)}</tr>
          <tr>{generateCalendarCells().slice(35)}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default PTCalendar;
