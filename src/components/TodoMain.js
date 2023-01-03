import {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./Modal";

function TodoMain () {
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/todos',{
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then((res) => {
            setTodoList(res.data.data)
        })
    }, [])



    const [onAddModal, setOnAddModal] = useState(false)
    const [onModifyModal, setOnModifyModal] = useState(false)
    const [clickedTodo, setClickedTodo] = useState(null)

    const udtTodoList = (todo) => {
        setOnModifyModal(true)
        setClickedTodo(todo)
    }

    const delTodoList = (id) => {
        axios.delete(`http://localhost:8080/todos/${id}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then(() => {
            alert('삭제가 완료되었습니다.')
            axios.get('http://localhost:8080/todos',
                {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    }
                }).then((res) => {
                    setTodoList(res.data.data)
                }
            )
        })
    }

    return (
        <div>
            {onAddModal? <Modal type='add' setModal={setOnAddModal} setTodoList={setTodoList}></Modal> : null}
            {onModifyModal? <Modal type='modify' setModal={setOnModifyModal} setTodoList={setTodoList} clickedTodo={clickedTodo}></Modal> : null}
            <br/>
            <button onClick={() => {setOnAddModal(true)}}>추가하기</button>
            <br/>
            {
                todoList.map((todo) => {
                    return (
                        <div>
                            {todo.title}
                            <button onClick={() => {udtTodoList(todo)}}>수정하기</button>
                            <button onClick={() => {delTodoList(todo.id)}}>삭제하기</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TodoMain