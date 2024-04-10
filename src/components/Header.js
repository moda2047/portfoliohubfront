import "./Header.css";
import $ from "jquery";
import {} from "jquery.cookie";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    $.removeCookie("cookie");
    navigate("/");
    window.location.reload();
  };
  const goMainPage = () => {
    navigate("/");
  };

  const text_bold = {
    fontWeight: "bold",
  };

  const hiddenHeaderPaths = [
    "/login",
    "/signup",
    "/searchId",
    "/searchpw",
    "/changepw",
    "/resultid",
  ];
  if (hiddenHeaderPaths.includes(window.location.pathname)) {
    return null;
  }

  return (
    <div className="headerBody">
      <div className="headerLeft" onClick={goMainPage}>
        <img
          style={{ width: "50px", marginLeft: "25px", marginBottom: "-5px" }}
          src="/portfoliohub_logo.png"
          alt="logo"
        />
        <div style={text_bold}>PortfolioHub</div>
      </div>
      <nav>
        <ul>
          <li>포트폴리오 목록</li>
          <li>구인 게시판</li>
          <li>일정관리</li>
          <li>팔로우</li>
          <li>채팅</li>
        </ul>
      </nav>
      <div className="headerRight">
        {$.cookie("cookie") ? (
          <span onClick={() => logout()}>로그아웃</span>
        ) : (
          <span>
            <Link to="/login">로그인</Link>
          </span>
        )}
        <p style={{ display: "inline", margin: "0 10px" }}>|</p>
        {$.cookie("cookie") ? <span>마이페이지</span> : <span>회원가입</span>}
      </div>
    </div>
  );
};
export default Header;
