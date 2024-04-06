import React, { useEffect, useState } from "react";
import CalendarCell from "./CalendarCell";
import "../css/PTCalendar.css";
import axios from "axios";

const PTCalendar = ({ maindate, getclick }) => {
  const [currentDate, setCurrentDate] = useState(maindate);
  const [event, setEvent] = useState();
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
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    getclick(clickedDate);
  };
  const getEvent = async () => {
    const url = `http://localhost:8080/event?month=${
      currentDate.getMonth() + 1
    }`;
    const headers = {
      headers: {
        // Authorization: cookies.token,
        ContentType: "application/json",
        Accept: "application/json",
      },
    };
    console.log("fetchData 함수가 실행됩니다.");

    axios
      .get(url, { headers: headers })
      .then((response) => {
        console.log("API 응답 데이터: ", response.data);
        if (response.data.result) {
          console.log(response.data.data);
          setEvent(response.data.data);
          console.log("성공적으로 됐");
        } else {
          console.log("실패");
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
      });
  };

  useEffect(() => {
    getEvent();
  }, [currentDate]);

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
      const cellDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDay
      );
      let cellEvents = [];

      // 이벤트 날짜 맞추기
      if (event) {
        cellEvents = event.filter((item) => {
          const eventDate = new Date(item.startTime);
          return (
            eventDate.getDate() === cellDate.getDate() &&
            eventDate.getMonth() === cellDate.getMonth() &&
            eventDate.getFullYear() === cellDate.getFullYear()
          );
        });
      }

      if (currentDay <= lastDayOfMonth) {
        calendarCells.push(
          <CalendarCell
            key={`day-${currentDay}`}
            day={currentDay}
            events={cellEvents}
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
          className="moveimghover"
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
          className="moveimghover"
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
