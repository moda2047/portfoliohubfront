import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarMain from "./pages/CalendarMain";
import PTCalendar from "./components/calendar/PTCalendar";
import EventList from "./components/event/EventList";
import EventAdd from "./components/event/EventAdd";
import EventDetail from "./components/event/EventDetail";
import EventListRow from "./components/event/EventListRow";
import EventUpdate from "./components/event/EventUpdate";

function App() {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalendarMain />}></Route>
          <Route path="/ptcalendar" element={<PTCalendar />}></Route>
          <Route path="/eventlist" element={<EventList />}></Route>
          <Route path="/eventadd" element={<EventAdd />}></Route>
          <Route path="/eventdetail" element={<EventDetail />}></Route>
          <Route path="/eventupdate" element={<EventUpdate />}></Route>
          <Route path="/eventlistrow" element={<EventListRow />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
