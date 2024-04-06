import React, { useEffect, useState } from "react";
import "../css/EventList.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventListRow from "./EventListRow";

export const EventList = ({ maindate }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [eventList, setEventList] = useState();
  useEffect(() => {
    getEvent(maindate);
    const formatDate = (date) => {
      const options = { weekday: "short", month: "short", day: "numeric" };
      return new Intl.DateTimeFormat("ko-KR", options).format(date);
    };
    setFormattedDate(formatDate(maindate));
  }, [maindate]);
  const getEvent = async (maindate) => {
    const url = `http://localhost:8080/event/day?month=${
      maindate.getMonth() + 1
    }&day=${maindate.getDate()}`;
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
    navigate("./eventadd");
  };

  const asd = () => {
    console.log(formattedDate);
  };
  return (
    <>
      <div className="eventBox" onClick={asd}>
        <div className="eventBoxHeader">
          <h1>{formattedDate.split(" ")[1]}</h1>
          <h2>
            {formattedDate.split(" ")[0]} {formattedDate.split(" ")[2]}
          </h2>
        </div>
        <hr></hr>
        <div className="eventBoxList">
          {eventList &&
            eventList.map((event, index) => (
              <div key={index} className="eventItem">
                <EventNoteIcon />

                <EventListRow event={event} />
              </div>
            ))}
        </div>
        <hr></hr>
        <div className="eventBoxFooter">
          <input type="text" className="eventBoxFooter-input"></input>
          <button className="eventBoxListAdd" onClick={handleMoveAdd}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default EventList;
