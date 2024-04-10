import EventNoteIcon from "@mui/icons-material/EventNote";
import "../css/EventListRow.css";
import { useNavigate } from "react-router-dom";
import { Route } from "@mui/icons-material";

export const EventListRow = ({ event }) => {
  const navigate = useNavigate();
  const clickEventOne = () => {
    navigate(`/eventdetail`, { state: { eventId: event.id } });
  };

  return (
    <>
      <div className="eventListRowWrap" onClick={clickEventOne}>
        <EventNoteIcon className="eventIcon" />
        <div>
          <div class="eventListRowVector"></div>
        </div>
        <div className="eventListEvent">
          <div className="eventListTitle">{event.title}</div>
          <div className="eventListContent">{event.content}</div>
        </div>
      </div>
    </>
  );
};

export default EventListRow;
