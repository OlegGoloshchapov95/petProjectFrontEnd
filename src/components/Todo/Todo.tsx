import styles from "./Todo.module.scss"
import {cc} from "../../utils/Classnames"

interface TodoProps {
	title: string
	description: string
}

function Todo(props: TodoProps) {
	const {
		title,
		description
	} = props

	return (
		<div className={styles.todoWrapper}>
			<h2 className={styles.todoTitle}>{title}</h2>
			<p className={styles.todoDescription}>
				{description}
			</p>
		</div>
	)
}

export default Todo
