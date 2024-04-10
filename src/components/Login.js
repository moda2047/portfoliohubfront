import "./Login.css";
import { useRef } from "react";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const idRef = new useRef(null);
  const pwRef = new useRef(null);
  const navigate = useNavigate();
  const login = () => {
    let id = idRef.current.value;
    let pw = pwRef.current.value;
    if (id === "") {
      alert("아이디를 입력해주세요.");
    } else if (pw === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      let user = {
        id: id,
        password: pw,
      };
      axios
        .post("http://localhost:8080/user/login", user)
        .then((returnData) => {
          if (returnData.data) {
            alert("로그인 성공");
            $.cookie("cookie", returnData.data, { expires: 1 });
            navigate("/calendarmain");
          } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          }
        });
    }
  };

  return (
    <div className="loginBody">
      <div className="loginBox">
        <div className="loginInBox">
          <div className="login_logo_text">
            <img
              style={{ width: "60px" }}
              src="./portfoliohub_logo.png"
              alt="logo"
            />
            <div>PortfolioHub</div>
          </div>
          <div className="loginInputBox">
            <div>아이디</div>
            <input type="text" ref={idRef} />
            <div>비밀번호</div>
            <input type="password" ref={pwRef} />
            <button onClick={() => login()}>
              <div>
                <img
                  style={{ width: "20px", marginTop: "-7px" }}
                  src="./portfoliohub_logo.png"
                  alt="logo"
                />
                <span> 로그인 </span>
              </div>
            </button>
            <div className="loginFind">
              <span>
                <Link to={"/searchId"}>아이디 찾기</Link>
              </span>
              <span>/</span>
              <span>
                <Link to={"/searchpw"}>비밀번호 찾기</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
