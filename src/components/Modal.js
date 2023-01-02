import modal from './modal.css'
import axios from "axios";
import {useState} from "react";

function Modal(props) {
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
                console.log(res)
            })
        }
    }

    return (
        <div className="modal__wrap">
            <div className="modal__body">
                <div className="modal__body__title">
                    {props.type === 'add'? 'TodoList 추가' : 'TodoList 수정'}
                </div>
                <div>제목 <input type="text" onInput={inputTodoTitle}/></div>
                <div>내용 <textarea type="text" onInput={inputTodoContent}/></div>
                <div className="modal__bottom">
                    <button onClick={addTodoList}>추가하기</button>
                    <button onClick={() => {props.setModal(false)}}>닫기</button>
                </div>
            </div>
        </div>
    )
}

export default Modal