import {useState} from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Auth() {
    const [login, setLogin] = useState(false)

    return (
        <div>
            {login? null : <Signup></Signup>}
            {login? <Login></Login> : null}

            {login? <button onClick={() => {setLogin(false)}}>회원가입 하러가기</button>
                : <button onClick={() => {setLogin(true)}}>로그인 하러가기</button>}
        </div>
    )
}

export default Auth