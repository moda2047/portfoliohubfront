import React, { useEffect, useState } from "react";
import "../css/EventAdd.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

const EventUpdate = () => {
  const navigate = useNavigate();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [eventDetail, setEventDetail] = useState({
    id: null,
    userId: "",
    title: "",
    content: "",
    startTime: "",
    endTime: "",
    createdAt: "",
    updatedAt: "",
  });
  const [startDate, setStartDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false); // 달력을 보여줄지 여부를 상태로 관리

  const [title, setTitle] = useState(eventDetail.title);
  const [context, setContext] = useState(eventDetail.content);

  const onDatePickHandler = (date) => {
    setStartDate(formatDate(date));
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const location = useLocation();
  const eventId = location.state ? location.state.eventId : null;
  const getEvent = async () => {
    const url = `http://localhost:8080/event/${eventId}`;
    const headers = {
      Authorization: $.cookie("cookie"),
      ContentType: "application/json",
      Accept: "application/json",
    };
    console.log("디테일에서 가져오기");
    axios
      .get(url, { headers: headers })
      .then((response) => {
        console.log("API 응답 데이터: ", response.data);
        if (response.data.result) {
          console.log(response.data);
          setEventDetail(response.data.data);
          setStartDate(formatDate(new Date(response.data.data.startTime)));
          console.log("업데이트 디테일");
        } else {
          console.log("실패");
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
      });
  };
  useEffect(() => {
    console.log("업데이트쪽" + eventId);
    getEvent();
  }, []);
  useEffect(() => {
    if (Object.keys(eventDetail).length !== 0) {
      setTitle(eventDetail.title);
      setContext(eventDetail.content);
    }
  }, [eventDetail]);

  const cancleEventUpdate = () => {
    navigate("/calendarMain");
  };
  const updateEvent = async () => {
    const data = {
      title: title,
      content: context,
      startTime: new Date(startDate),
      endTime: new Date(startDate),
    };
    const url = `http://localhost:8080/event/${eventId}`;
    const headers = {
      Authorization: $.cookie("cookie"),
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .put(url, data, {
        headers: headers,
      })
      .then((response) => {
        window.alert("일정이 수정되었습니다.");
        console.log(response.data.message);
        navigate("/calendarMain");
      })
      .catch((error) => {
        window.alert("일정 추가 중 오류가 발생했습니다.");
        console.error("일정 추가 중 오류가 발생했습니다.", error);
      });
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
              value={title}
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
            value={context}
            onChange={(e) => setContext(e.target.value)}
          ></textarea>
        </div>
        <hr />
        <div className="eventAddBoxFooter">
          <div className="eventAddBoxFooter-icon">
            <button className="eventAddBoxFooter-button" onClick={updateEvent}>
              저장
            </button>
          </div>
          <div className="eventAddBoxFooter-icon">
            <button
              className="eventAddBoxFooter-button"
              onClick={cancleEventUpdate}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventUpdate;
