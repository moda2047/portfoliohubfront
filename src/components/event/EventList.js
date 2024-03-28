import React, { useState } from "react";
import "../css/EventList.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
const EventList = () => {
  const navigate = useNavigate();
  const handleMoveAdd = () => {
    navigate("./eventadd");
  };
  return (
    <>
      <div className="eventBox">
        <div className="eventBoxHeader">
          <h1>1</h1>
          <h2>수요일</h2>
        </div>
        <hr></hr>
        <div className="eventBoxList">
          <EventNoteIcon />
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
