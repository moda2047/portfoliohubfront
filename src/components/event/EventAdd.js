import React, { useState } from "react";
import "../css/EventAdd.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const EventAdd = () => {
  return (
    <>
      <div className="eventAddBox">
        <div className="eventAddBoxBody">
          <div className="eventAddBoxBodyRow">
            <span className="eventAddBoxBodyRow-span">일정 제목</span>
            <input type="text" className="eventAddBoxBodyRow-input"></input>
          </div>
          <br></br>
          <div className="eventAddBoxBodyRow">
            <span className="eventAddBoxBodyRow-span">날짜</span>
            <input type="text" className="eventAddBoxBodyRow-input2"></input>
            <EventNoteIcon
              fontSize="large"
              className="eventAddBoxBodyRow-icon"
            />
          </div>
          <br></br>
          <span className="eventAddBoxBodyRow-span">일정 설명</span>
          <br></br>
          <textarea className="eventAddBoxBodyRow-input3">초기 텍스트</textarea>
        </div>
        <hr />
        <div className="eventAddBoxFooter">
          <div className="eventAddBoxFooter-icon">
            <button className="eventAddBoxFooter-button">저장</button>
          </div>
          <div className="eventAddBoxFooter-icon">
            <button className="eventAddBoxFooter-button">취소</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventAdd;
