import $ from "jquery";
import {} from "jquery.cookie";
import { Link } from "react-router-dom";
const MainPage = ()=>{
    const logout =()=>{
        $.removeCookie("cookie");
        window.location.reload();
    }
    return(
        <div>
            {$.cookie("cookie")?"로그인 중":<Link to="/signup">회원가입</Link>}
            {$.cookie("cookie")?<button onClick={()=>logout()}>로그인아웃</button>:<Link to="/login">로그인</Link>}
        </div>
    )
}
export default MainPage;