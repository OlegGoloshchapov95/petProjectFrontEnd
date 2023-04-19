import styles from "./Message.module.scss"
import {useDeleteMessageByIdMutation} from '../../redux'

interface MessageProps {
	description: string
	id: string
	userName: string
}

function Message(props: MessageProps) {
	const {
		description,
		id,
		userName,
	} = props

	const [deleteMessageByIdTrigger, deleteMessageByIdResult] = useDeleteMessageByIdMutation()

	return (
		<div className={styles.todoWrapper}>
			<span className={styles.todoUser}>{userName}</span>
			<p className={styles.todoDescription}>
				{description}
			</p>
			<span className={styles.todoDelete} onClick={() => {
				deleteMessageByIdTrigger(id)
			}}>Удалить</span>
		</div>
	)
}

export default Message
