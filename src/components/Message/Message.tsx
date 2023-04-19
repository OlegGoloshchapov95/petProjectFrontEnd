import styles from "./Message.module.scss"
import {useDeleteMessageByIdMutation, useLazyMeUserQuery} from '../../redux'
import {useEffect} from "react";

interface MessageProps {
	description: string
	id: string
	userName: string
	userId: string
}

function Message(props: MessageProps) {
	const {
		description,
		id,
		userName,
		userId,
	} = props

	const [deleteMessageByIdTrigger, deleteMessageByIdResult] = useDeleteMessageByIdMutation()
	const [meUserTrigger, meUserResult] = useLazyMeUserQuery()

	useEffect(() => {
		meUserTrigger({})
	},[meUserTrigger])

	useEffect(() => {
		console.log("meUserResult")
		console.log(meUserResult)
	},[meUserResult])

	return (
		<div className={styles.todoWrapper}>
			<span className={styles.todoUser}>{userName}</span>
			<p className={styles.todoDescription}>
				{description}
			</p>
			{meUserResult?.data?.id && meUserResult?.data?.id == userId && (
			<span className={styles.todoDelete} onClick={() => {
				deleteMessageByIdTrigger(id)
			}}>Удалить</span>)}
		</div>
	)
}

export default Message
