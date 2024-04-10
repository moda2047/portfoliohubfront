import React, { useState } from "react";
import "../css/EventDetail.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const EventUpdate = () => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [showCalendar, setShowCalendar] = useState(false); // 달력을 보여줄지 여부를 상태로 관리

  const onDatePickHandler = (date) => {
    setStartDate(formatDate(date));
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  return (
    <>
      <div className="eventDetailBox">
        <div className="eventDetailBoxBody">
          <div className="eventDetailBoxBodyRow">
            <span className="eventDetailBoxBody-span">일정 제목</span>
            <input type="text" className="eventDetailBoxBody-input"></input>
          </div>
          <br></br>
          <div className="eventDetailBoxBodyRow">
            <span className="eventDetailBoxBody-span">날짜</span>
            <input
              type="text"
              className="eventAddBoxBodyRow-input2"
              onClick={toggleCalendar}
              value={startDate}
              readOnly
            />
            <EventNoteIcon
              fontSize="large"
              className="eventAddBoxBodyRow-icon"
              onClick={toggleCalendar}
            />
            {showCalendar && (
              <div className="calendarOverlay">
                <DatePicker
                  onChange={(date) => onDatePickHandler(date)}
                  selected={startDate}
                  inline
                />
              </div>
            )}
          </div>
          <br></br>
          <span className="eventDetailBoxBody-span">일정 설명</span>
          <br></br>
          <textarea className="eventDetailBoxBody-input3">초기 텍스트</textarea>
        </div>
        <hr />
        <div className="eventDetailBoxFooter">
          <div className="eventDetailBoxFooter-icon">
            <img src="./images/edit.png" alt="수정 아이콘" />
            <div className="click">수정</div>
          </div>
          <div className="eventDetailBoxFooter-icon">
            <img src="./images/delete.png" alt="삭제 아이콘" />
            <div className="click">삭제</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventUpdate;
