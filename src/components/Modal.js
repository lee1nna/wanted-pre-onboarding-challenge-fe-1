import modal from './modal.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {customAxios} from "../modules/customAxios";

function Modal(props) {
    useEffect(() => {
        if(props.clickedTodo) {
            setTodoContent(props.clickedTodo.content)
            setTodoTitle(props.clickedTodo.title)
        }
    }, [])

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
            customAxios.post('/todos',{
                title: todoTitle,
                content: todoContent
            }).then((res) => {
                customAxios.get('/todos').then((res) => {
                        props.setTodoList(res.data.data)
                        props.setModal(false)
                }
                )
            })
        }
    }

    const modifyTodoList = (id, title, content) => {
        customAxios.put(`/todos/${id}`, {
            title: todoTitle,
            content: todoContent
        }).then((res) => {
            customAxios.get('/todos').then((res) => {
                    props.setTodoList(res.data.data)
                    props.setModal(false)
                }
            )
        })
    }

    return (
        <div className="modal__wrap">
            <div className="modal__body">
                <div className="modal__body__title">
                    {props.type === 'add'? '새로운 할 일 추가하기' : '할 일 수정하기'}
                </div>
                <div className="modal__sub-title">제목</div>
                <input className="modal__sub-title__input" defaultValue={props.clickedTodo? props.clickedTodo.title : null} type="text" onInput={inputTodoTitle}/>
                <div className="modal__content">내용</div>
                <textarea className="modal__content__input" defaultValue={props.clickedTodo? props.clickedTodo.content : null} type="text" onInput={inputTodoContent}/>
                <div className="modal__bottom">
                    {props.type === 'add'? <button className="modal__add__btn" onClick={addTodoList}>추가하기</button>
                        : <button className="modal__modify__btn" onClick={() => {modifyTodoList(props.clickedTodo.id)}}>수정하기</button>}
                    <button className="modal__close__btn" onClick={() => {props.setModal(false)}}>닫기</button>
                </div>
            </div>
        </div>
    )
}

export default Modal