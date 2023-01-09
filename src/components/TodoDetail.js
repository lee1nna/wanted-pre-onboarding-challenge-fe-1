import {useParams} from "react-router";
import {useEffect} from "react";

function TodoDetail(props) {
    useEffect(() => {

    },[])
    return (
        <div>
            <h2>
                {props.todo.title}
            </h2>
            <div>
                {props.todo.content}
            </div>
        </div>
    )
}

export default TodoDetail