import {useState} from "react";
import axios from "axios";

function Signup (props) {
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

    const clickLogin = () => {
        props.setLogin(true)
    }

    return (
        <div className="sign-up__wrap">
            <h1 className="sign-up__title">회원가입</h1>
            <div className="sign-up__email">이메일</div>
            <input className="sign-up__email__input" type="text" onInput={inputEmail} placeholder="이메일을 입력해주세요."/>
            <div className="sign-up__pw">비밀번호</div>
            <input className="sign-up__pw__input" type="password" onInput={inputPw} placeholder="비밀번호를 8자 이상 입력해주세요."/>
            <div className="sign-up__btn">
                <button disabled={!(emailValid && pwValid)} onClick={clickSignUp}>회원가입</button>
                <button onClick={clickLogin}>로그인</button>
            </div>
        </div>
    )
}

export default Signup