import { useState, useRef } from "react";
import EmailModal from "./EmailModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";


const SignUp = ()=>{
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = new useState(false);
    const [checkEmail,setCheckEmail] = new useState(false);
    const [isId,setIsId] = new useState(false);
    const [checkPW,setCheckPW] = new useState(false);
    const [pwText,setPwText] = new useState("");
    const regExpPW = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const idRef = new useRef(null);
    const pwRef = new useRef(null);
    const pwDuplicationRef = new useRef(null);
    const emailRef = new useRef(null);
    const nameRef = new useRef(null);
    const modalHandler= ()=>{
        setIsModalOpen(!isModalOpen);
    }

    const IdChangeHandler = ()=>{
        setIsId(false);
    }
    const pwChangeHandler = ()=>{
        let pw = pwRef.current.value;
        if(pw===""){
            setPwText("");
            setCheckPW(false);
        }
        else if(pw.match(regExpPW) === null || pw.match(regExpPW) === undefined ){
            setPwText("영문, 숫자, 특수 문자를 전부 포함해서 8자이상 16자 이하로 입력해주세요.");
            setCheckPW(false);
        }
        else{
            setPwText("");
            setCheckPW(true);
        }

    }
    const CheckPWdDuplication= ()=>{
        let pw = pwRef.current.value;
        let pwDuplication = pwDuplicationRef.current.value;
        if(pwDuplication===""){
            setPwText("");
            setCheckPW(false);
        }
        else if(pw!==pwDuplication){
            setPwText("비밀번호가 일치하지 않습니다.");
            setCheckPW(false);
        }
        else{
            setPwText("");
            setCheckPW(true);
        }
    }
    const checkId = ()=>{
        let id = idRef.current.value;
        axios.get(`http://localhost:8080/user/${id}/checkid`)
        .then(returnData=>{
            if(returnData.data){
                console.log(returnData.data);
                alert("중복된 아이디입니다.");
            }
            else{
                alert("사용 가능한 아이디입니다.");
                setIsId(true);
            }
        })
    }
    const checkEmailHandler = async()=>{
        let email = emailRef.current.value;
        if(checkEmail){
            return
        }
        if(email.match(regExpEmail) === null || email.match(regExpEmail) === undefined){
            alert("이메일 형식을 입력해주세요.");
            return;
        }
        let emailDuplication = await checkEmailDuplication(email);
        console.log(emailDuplication);
        if(emailDuplication){
            alert("이미 존재하는 이메일입니다.");

        }
        else{
            setIsModalOpen(!isModalOpen);
        }
    

        
     
    }
    const checkEmailDuplication = async(email)=>{
        let result = null;
        await axios.get(`http://localhost:8080/user/${email}/checkemail-signup`)
        .then(returnData=>{
            result= returnData.data;
        }
        
        )
        return result;
    }

    
    const emailAuthentication = async(num) =>{
        let email = emailRef.current.value;
        await axios.get(`http://localhost:8080/user/${email}/${num}/authentication`)
        .then(returnData=>{
            if(returnData.data){
                setCheckEmail(true);
                alert("이메일 인증 완료");
                setIsModalOpen(false);
            }
            else{
                alert("인증번호가 다릅니다.");
                setIsModalOpen(false);
            }
        })
       
    }
    const signup = async()=>{
        console.log("id : ",isId);
        console.log("pw : ",checkPW);
        console.log("email : ",checkEmail);
        if(isId && checkPW && checkEmail){
           let user = {
                id: idRef.current.value,
                password: pwRef.current.value,
                email : emailRef.current.value,
                name : nameRef.current.value
            }
            await axios.post(`http://localhost:8080/user`, user)
            .then(returnData=>{
                if(returnData.data){
                    alert("가입이 완료됐습니다.");
                    navigate("/");
                }
                else{
                    alert("가입이 실패했습니다.")
                }
            }
            )
        }
        else if(!isId){
            alert("아이디를 확인해주세요");
        }
        else if(!checkPW){
            alert("비밀번호를 확인해주세요");
        }
        else{
            alert("이메일를 확인해주세요");
        }
    }

    return(
    <div className='signUpBody'>
        <div className="signUpBox">
            <div className='signUpInBox'>
                <div className='signUp_logo_text'>
                    <img style={{width:"60px", marginBottom:"5px"}}src="./portfoliohub_logo.png" alt="logo"/>
                    <span>PortfolioHub</span>
                    </div>
                    <div>회원가입</div>
                    <div className='signUpInputBox'>
        <div>아이디</div>
        <input type="text" className="shortInput" placeholder="아이디를 입력해주세요." ref={idRef} onChange={()=>IdChangeHandler()}/>
        <button onClick={()=>checkId()}>중복 확인</button>
        <div>비밀번호</div>
        <input type="password" className="pwInput" ref={pwRef} onChange={()=>pwChangeHandler()} placeholder="영문, 숫자, 특수 문자를 전부 포함해서 8자이상 16자 이하로 입력해주세요."/>
        <div>비밀번호 확인</div>
        <input type="password" ref={pwDuplicationRef} onChange={()=>CheckPWdDuplication()}/>
        {pwText===""?<div><br/></div>:<div style={{fontSize:"12px",height:"23px"}}>{pwText}</div>}
        <div>Email</div>
        <input type="text" className="shortInput" ref={emailRef} placeholder="이메일을 입력주세요." disabled={checkEmail}/>
        <button onClick={()=>checkEmailHandler()}>인증번호 발송</button>
        <div>이름</div>
        <input type="text" placeholder="이름을 입력해주세요." ref={nameRef}/>
     
        <button className="bigBtn" onClick={()=>signup()}>가입하기</button>
        
        </div>

        </div>
        </div>
        <EmailModal show={isModalOpen} onHide={()=>modalHandler()} emailAuthentication={emailAuthentication}/>
        </div>
    )
}
export default SignUp