import {useEffect, useState} from "react";
import axios from "axios";

function TodoMain () {
    useEffect(() => {
        axios.get('http://localhost:8080/todos',{
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then((res) => {
            setTodoList(res.data.data)
        })
    })

    const [todoList, setTodoList] = useState([])
    const [todoTitle, setTodoTitle] = useState('')
    const [todoContent, setTodoContent] = useState('')

    const inputTodoTitle = (e) => {
        setTodoTitle(e.target.value)
    }

    const inputTodoContent = (e) => {
        setTodoContent(e.target.value)
    }

    const addTodoList = () => {
        if(todoTitle.length === 0 || todoContent.length === 0) {
            alert('할일의 제목이나 내용을 입력해주세요.')
        } else {
            axios.post('http://localhost:8080/todos',{
                title: todoTitle,
                content: todoContent
            } ,{
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            }).then((res) => {
                setTodoList(res.data.data)
                console.log(res)
            })
        }
    }

    const udtTodoList = () => {

    }

    const delTodoList = () => {

    }

    return (
        <div>
            <h1>TodoList</h1>
            제목: <input type="text" placeholder="ex) 리액트 공부" onInput={inputTodoTitle}/>
            <br/>
            내용: <textarea type="text" placeholder="ex) 리액트로 원티드 과제하기" onInput={inputTodoContent}/>
            <br/>
            <button onClick={addTodoList}>추가하기</button>
            <button onClick={udtTodoList}>수정하기</button>
            <button onClick={delTodoList}>삭제하기</button>
            <br/>
            <br/>
            {
                todoList.map((todo) => {
                    return (
                        todo.title
                    )
                })
            }
        </div>
    )
}

export default TodoMain