import { Modal } from "react-bootstrap";
import "./EmailModal.css"
import { useRef } from "react";


const EmailModal = ({show,onHide,emailAuthentication})=>{
    const numRef = new useRef(null);
    return(
        <div className="modalBody">
    <Modal show={show} onHide={onHide}>
        <hr/>
        <Modal.Title className="modalTitle">Email 인증</Modal.Title>
     
        <Modal.Body>
            <div className="modalDesc">이메일에 받은 인증번호를 적어 인증해주세요</div>
            <input type="text" className="modalInput" ref={numRef}/>
            <div><button className="modalBtn" onClick={()=>emailAuthentication(numRef.current.value)}>인증하기</button></div>

        </Modal.Body>
    </Modal>
    </div>
    )
}
export default EmailModal