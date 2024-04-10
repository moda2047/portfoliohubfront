import React, { useState } from "react";
import "../css/EventAdd.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
const EventAdd = () => {
  const navigate = useNavigate();
  // 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [showCalendar, setShowCalendar] = useState(false); // 달력을 보여줄지 여부를 상태로 관리

  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  const onDatePickHandler = (date) => {
    setStartDate(formatDate(date));
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const sendData = () => {
    if (!title.trim()) {
      window.alert("제목을 입력하세요.");
      return;
    }
    const data = {
      title: title,
      content: context,
      startTime: new Date(startDate),
      endTime: new Date(startDate),
    };
    const url = "http://localhost:8080/event";
    const headers = {
      Authorization: $.cookie("cookie"),
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        window.alert("일정이 추가되었습니다.");
        console.log(response.data.message);
        navigate("/calendarMain");
      })
      .catch((error) => {
        window.alert("일정 추가 중 오류가 발생했습니다.");
        console.error("일정 추가 중 오류가 발생했습니다.", error);
      });
  };
  const cancleEventAdd = () => {
    navigate("/calendarMain");
  };
  return (
    <>
      <div className="eventAddBox">
        <div className="eventAddBoxBody">
          <div className="eventAddBoxBodyRow">
            <span className="eventAddBoxBodyRow-span">일정 제목</span>
            <input
              type="text"
              className="eventAddBoxBodyRow-input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br />
          <div className="eventAddBoxBodyRow">
            <span className="eventAddBoxBodyRow-span">날짜</span>
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
          <br />
          <span className="eventAddBoxBodyRow-span">일정 설명</span>
          <br />
          <textarea
            className="eventAddBoxBodyRow-input3"
            onChange={(e) => setContext(e.target.value)}
            placeholder="상세한 설명을 하시오."
          ></textarea>
        </div>
        <hr />
        <div className="eventAddBoxFooter">
          <div className="eventAddBoxFooter-icon">
            <button className="eventAddBoxFooter-button" onClick={sendData}>
              저장
            </button>
          </div>
          <div className="eventAddBoxFooter-icon">
            <button
              className="eventAddBoxFooter-button"
              onClick={cancleEventAdd}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventAdd;
