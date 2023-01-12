import {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./Modal";
import TodoDetail from "./TodoDetail";
import {useNavigate} from 'react-router'
import todo from './todo.css'
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import {Link} from "react-router-dom";

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
        <div className="todo__wrap">
            <h1>TODO LIST</h1>
            <div className="todo__box">
                <div className="todo__list__wrap">
                    {onAddModal? <Modal type='add' setModal={setOnAddModal} setTodoList={setTodoList}></Modal> : null}
                    {onModifyModal? <Modal type='modify' setModal={setOnModifyModal} setTodoList={setTodoList} clickedTodo={clickedTodo}></Modal> : null}
                    <button className="add__todo__btn" onClick={() => {setOnAddModal(true)}}> + 추가하기</button>
                    {
                        todoList.map((todo) => {
                            return (
                                <Link to={`/`+todo.id}>
                                <div className="todo__list__title" onClick={() => {setShowDetailTodo({isShow:true, todo:todo})}}>
                                    {todo.title}
                                    <div>
                                        <button className="edit__btn" onClick={() => {udtTodoList(todo)}}>
                                            <img src={editIcon} alt=""/>
                                        </button>
                                        <button className="delete__btn"  onClick={() => {delTodoList(todo.id)}}>
                                            <img src={deleteIcon} alt=""/>
                                        </button>
                                    </div>
                                </div>
                                </Link>
                            )
                        })
                    }
                </div>
                    <div className="detail__todo__wrap">
                        <button className="logout__btn" onClick={logout}>로그아웃</button>
                        <div className="detail__todo__list">
                            {
                                showDetailTodo.isShow?
                                    <TodoDetail todo={showDetailTodo.todo}></TodoDetail> : null
                            }
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default TodoMain