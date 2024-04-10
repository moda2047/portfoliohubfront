import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/EventDetail.css";
import axios from "axios";
import EventNoteIcon from "@mui/icons-material/EventNote";
import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";
import {} from "jquery.cookie";
import Tooltip from "@mui/material/Tooltip";

const EventDetail = () => {
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
          console.log("Detail하게 가져오기 성공");
        } else {
          console.log("실패");
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
      });
  };
  useEffect(() => {
    console.log(eventId);
    getEvent();
  }, []);
  const deleteEvent = async () => {
    const url = `http://localhost:8080/event/${eventId}`;
    const headers = {
      Authorization: $.cookie("cookie"),
      ContentType: "application/json",
      Accept: "application/json",
    };
    console.log("일정 삭제하기");
    axios
      .delete(url, { headers: headers })
      .then((response) => {
        console.log("API 응답 데이터: ", response.data);
        if (response.data.result) {
          console.log(response.data);
          navigate("/calendarMain");
        } else {
          console.log("실패");
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
      });
  };
  return (
    <>
      <div className="eventDetailBox">
        <div className="eventDetailBoxBody">
          <div className="eventDetailBoxBodyRow">
            <span className="eventDetailBoxBody-span">일정 제목</span>
            <Tooltip title={eventDetail.title}>
              <input
                type="text"
                className="eventDetailBoxBody-input"
                value={eventDetail.title}
                readOnly
              />
            </Tooltip>
          </div>
          <br></br>
          <div className="eventDetailBoxBodyRow">
            <span className="eventDetailBoxBody-span">날짜</span>
            <input
              type="text"
              className="eventDetailBoxBody-input2"
              value={formatDate(new Date(eventDetail.startTime))}
              readOnly
            />
            <EventNoteIcon
              fontSize="large"
              className="eventAddBoxBodyRow-icon"
            />
          </div>
          <br></br>
          <span className="eventDetailBoxBody-span">일정 설명</span>
          <br></br>
          <textarea
            className="eventDetailBoxBody-input3"
            value={eventDetail.content}
            readOnly
          >
            {" "}
          </textarea>
        </div>
        <hr />
        <div className="eventDetailBoxFooter">
          <div className="eventDetailBoxFooter-icon">
            <img src="./images/edit.png" alt="수정 아이콘" />
            <div className="click">수정</div>
          </div>
          <div className="eventDetailBoxFooter-icon" onClick={deleteEvent}>
            <img src="./images/delete.png" alt="삭제 아이콘" />
            <div className="click">삭제</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
