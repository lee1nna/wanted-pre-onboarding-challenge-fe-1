function TodoDetail(props) {
    return (
        <div>
            <div>
                title: {props.todo.todo.title}
            </div>
            <div>
                content: {props.todo.todo.content}
            </div>
        </div>
    )
}

export default TodoDetail