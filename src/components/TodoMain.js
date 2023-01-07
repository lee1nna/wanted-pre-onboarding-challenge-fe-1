import {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./Modal";
import TodoDetail from "./TodoDetail";
import {useNavigate} from 'react-router'

function TodoMain () {
    const [todoList, setTodoList] = useState([])
    const navigator = useNavigate()

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
    const [showDetailTodo, setShowDetailTodo] = useState({
        isShow: false,
        todo: {}
    })

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

    const logout = () => {
        localStorage.removeItem('token')
        navigator('/auth')
    }

    return (
        <div>
            {onAddModal? <Modal type='add' setModal={setOnAddModal} setTodoList={setTodoList}></Modal> : null}
            {onModifyModal? <Modal type='modify' setModal={setOnModifyModal} setTodoList={setTodoList} clickedTodo={clickedTodo}></Modal> : null}
            <br/>
            <button onClick={() => {setOnAddModal(true)}}>추가하기</button>
            <button onClick={logout}>로그아웃</button>
            <br/>
            {
                todoList.map((todo) => {
                    return (
                        <div onClick={() => {setShowDetailTodo({isShow:true, todo:todo})}}>
                            {todo.title}
                            <button onClick={() => {udtTodoList(todo)}}>수정하기</button>
                            <button onClick={() => {delTodoList(todo.id)}}>삭제하기</button>
                        </div>
                )
                })
            }
            {
                showDetailTodo.isShow?
                    <TodoDetail></TodoDetail> : null
            }
        </div>
    )
}

export default TodoMain