import {useState} from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import auth from './auth.css'

function Auth() {
    const [login, setLogin] = useState(true)

    return (
        <div className="auth__wrap">
            {login? null : <Signup setLogin={setLogin}></Signup>}
            {login? <Login setLogin={setLogin}></Login> : null}
        </div>
    )
}

export default Auth