import {useState} from "react";
import {useNavigate} from 'react-router'
import axios from "axios";

function Login (props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [pw, setPw] = useState()

    const inputEmail = (e) => {
        setEmail(e.target.value)
    }

    const inputPw = (e) => {
        setPw(e.target.value)
    }

    const clickLogin = () => {
        if(localStorage.getItem('token')) {
            navigate('/')
        } else {
            axios.post('http://localhost:8080/users/login', {
                email: email,
                password: pw
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                alert(res.data.message)
                navigate('/')
            }).catch((err) => {
                alert(err.response.data.details)
            })
        }
    }

    const clickSignUp = () => {
        props.setLogin(false)
    }

    return (
        <div className="login__wrap">
            <h1 className="login__title">로그인</h1>
            <div className="login__email">이메일</div>
            <input className="login__email__input" onInput={inputEmail} type="text"/>
            <div className="login__pw">비밀번호</div>
            <input className="login__pw__input" onInput={inputPw} type="password"/>
            <div className="login__btn">
                <button onClick={clickLogin}>로그인</button>
                <button onClick={clickSignUp}>회원가입</button>
            </div>
        </div>
    )
}

export default Login