import {useState} from "react";
import axios from "axios";

function Signup () {
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [pwValid, setPwValid] = useState(false)

    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}')

    const inputEmail = (e) => {
        setEmail(e.target.value)
        if(email.match(emailRegex) !== null) {
            setEmailValid(true)
        } else {
            setPwValid(false)
        }
    }
    const inputPw = (e) => {
        setPw(e.target.value)
        if(pw.length >= 8) {
            setPwValid(true)
        } else {
            setPwValid(false)
        }
    }
    const clickSignUp = () => {
        axios.post('http://localhost:8080/users/create', {
            email: email,
            password: pw
        }).then((res) => {
            alert('회원가입이 완료되었습니다.')
        }).catch((error) => {
            alert(error.response.data.details)
        })
    }

    return (
        <div>
            <h1>회원가입</h1>
            <div>이메일 <input type="text" onInput={inputEmail} placeholder="이메일을 입력해주세요."/></div>
            <div>비밀번호 <input type="text" onInput={inputPw} placeholder="비밀번호를 8자 이상 입력해주세요."/></div>
            <button disabled={!(emailValid && pwValid)} onClick={clickSignUp}>회원가입</button>
        </div>
    )
}

export default Signup