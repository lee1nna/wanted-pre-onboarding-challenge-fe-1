import {useState} from "react";
import {useNavigate} from 'react-router'
import axios from "axios";

function Login () {
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

    return (
        <div>
            <h1>로그인</h1>
            <div>이메일 <input onInput={inputEmail} type="text"/></div>
            <div>비밀번호 <input onInput={inputPw} type="text"/></div>
            <button onClick={clickLogin}>로그인</button>
        </div>
    )
}

export default Login