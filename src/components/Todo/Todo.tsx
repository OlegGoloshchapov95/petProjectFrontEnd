import styles from "./Todo.module.scss"
import {useDeleteTodoMutation} from '../../redux'
import {cc} from "../../utils/Classnames"

interface TodoProps {
	title: string
	description: string
	id: string
}

function Todo(props: TodoProps) {
	const {
		title,
		description,
		id,
	} = props

	const [deleteTodoTrigger, deleteTodoResult] = useDeleteTodoMutation()

	return (
		<div className={styles.todoWrapper}>
			<h2 className={styles.todoTitle}>{title}</h2>
			<p className={styles.todoDescription}>
				{description}
			</p>
			<span className={styles.todoDelete} onClick={() => {
				deleteTodoTrigger(id)
			}}>Удалить</span>
		</div>
	)
}

export default Todo