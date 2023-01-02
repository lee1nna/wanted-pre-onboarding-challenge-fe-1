import {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./Modal";

function TodoMain () {
    useEffect(() => {
        axios.get('http://localhost:8080/todos',{
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then((res) => {
            setTodoList(res.data.data)
        })
    }, [todoList])

    const [todoList, setTodoList] = useState([])


    const [onAddModal, setOnAddModal] = useState(false)

    const udtTodoList = () => {

    }

    const delTodoList = () => {

    }

    return (
        <div>
            {onAddModal? <Modal type='add' setModal={setOnAddModal}></Modal> : null}
            <br/>
            <button onClick={() => {setOnAddModal(true)}}>추가하기</button>
            <button onClick={udtTodoList}>수정하기</button>
            <button onClick={delTodoList}>삭제하기</button>
            <br/>
            <br/>
            {
                todoList.map((todo) => {
                    return (
                        <div>
                            {todo.title}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TodoMain