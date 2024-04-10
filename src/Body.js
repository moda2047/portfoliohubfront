import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignuUp";
// import SearchID from "./components/SearchID";
// import SearchPW from "./components/SearchPW";
// import ChangePW from "./components/ChangePW";
// import ResultID from "./components/ResultID";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/MainPage";
import CalendarMain from "./pages/CalendarMain";
import PTCalendar from "./components/calendar/PTCalendar";
import EventList from "./components/event/EventList";
import EventAdd from "./components/event/EventAdd";
import EventDetail from "./components/event/EventDetail";
import EventListRow from "./components/event/EventListRow";
import Header from "./components/Header";
import EventUpdate from "./components/event/EventUpdate";

const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/searchId" element={<SearchID />} />
        <Route path="/searchpw" element={<SearchPW />} />
        <Route path="/changepw" element={<ChangePW />} />
        <Route path="/resultid" element={<ResultID />} /> */}
      <Route path="/calendarmain" element={<CalendarMain />}></Route>
      <Route path="/ptcalendar" element={<PTCalendar />}></Route>
      <Route path="/eventlist" element={<EventList />}></Route>
      <Route path="/eventadd" element={<EventAdd />}></Route>
      <Route path="/eventdetail" element={<EventDetail />}></Route>
      <Route path="/eventlistrow" element={<EventListRow />}></Route>
      <Route path="/eventupdate" element={<EventUpdate />}></Route>
    </Routes>
  );
};
export default Body;
