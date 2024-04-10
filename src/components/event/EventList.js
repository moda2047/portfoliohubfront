import React, { useEffect, useState } from "react";
import "../css/EventList.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventListRow from "./EventListRow";
import $ from "jquery";
import {} from "jquery.cookie";

export const EventList = ({ maindate, setEnterEvent, enterEvent }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [eventList, setEventList] = useState();
  const [titleEnter, setTitleEnter] = useState("");
  useEffect(() => {
    getEvent(maindate);
    const formatDate = (date) => {
      const options = { weekday: "short", month: "short", day: "numeric" };
      return new Intl.DateTimeFormat("ko-KR", options).format(date);
    };
    setFormattedDate(formatDate(maindate));
  }, [maindate, enterEvent]);
  const getEvent = async (maindate) => {
    const url = `http://localhost:8080/event/day?month=${
      maindate.getMonth() + 1
    }&day=${maindate.getDate()}`;
    const headers = {
      Authorization: $.cookie("cookie"),
      ContentType: "application/json",
      Accept: "application/json",
    };
    console.log("fetchData 함수가 실행됩니다.");

    axios
      .get(url, { headers: headers })
      .then((response) => {
        console.log("API 응답 데이터: ", response.data);
        if (response.data.result) {
          console.log(response.data);
          setEventList(response.data.data);
          console.log("성공적으로 됐");
        } else {
          console.log("실패");
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
      });
  };

  const navigate = useNavigate();
  const handleMoveAdd = () => {
    navigate("/eventadd");
  };

  const handleInputChange = (event) => {
    setTitleEnter(event.target.value);
  };
  const sendData = async (maindate) => {
    const url = "http://localhost:8080/event";
    const headers = {
      Authorization: $.cookie("cookie"),
      ContentType: "application/json",
      Accept: "application/json",
    };
    if (!titleEnter.trim()) {
      window.alert("제목을 입력하세요.");
      return;
    }
    const data = {
      title: titleEnter,
      startTime: maindate,
      endTime: maindate,
    };
    axios
      .post(url, data, { headers: headers }) // 수정된 부분
      .then((response) => {
        console.log("API 응답 데이터: ", response.data);
        if (response.data.result) {
          window.alert("일정이 추가되었습니다.");
          console.log(response.data);
          console.log("일정추가 제대로 됨.");
          console.log(maindate);
          setEnterEvent(true);
          setTitleEnter("");
        } else {
          console.log("실패");
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
      });
  };
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      // Enter 키가 눌렸을 때 함수 실행
      sendData(maindate);
      console.log("Enter 키가 눌렸습니다.");
    }
  };
  return (
    <>
      <div className="eventBox">
        <div className="eventBoxHeader">
          <span className="eventBoxHeaderDay">
            {formattedDate.split(" ")[1]}
          </span>
          <span className="eventBoxHeaderMonth">
            {formattedDate.split(" ")[0]} {formattedDate.split(" ")[2]}
          </span>
        </div>

        <div className="eventBoxList">
          {eventList &&
            eventList.map((event, index) => (
              <div key={index} className="eventItem">
                <EventListRow event={event} />
              </div>
            ))}
        </div>
        <hr></hr>
        <div className="eventBoxFooter">
          <input
            type="text"
            className="eventBoxFooter-input"
            value={titleEnter}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
          ></input>
          <button className="eventBoxListAdd" onClick={handleMoveAdd}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default EventList;
