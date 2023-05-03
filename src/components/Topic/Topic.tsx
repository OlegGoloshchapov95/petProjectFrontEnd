import styles from "./Topic.module.scss"
import {useDeleteTopicMutation, useLazyMeUserQuery, useLazyGetTopicByIdQuery, useDeleteMessageByIdMutation} from '../../redux'
import {cc} from "../../utils/Classnames"
import Link from "../Link/Link"
import {useNavigate} from "react-router-dom"
import {useEffect, useRef} from "react"
import Message from "../Message/Message";

interface TopicProps {
	title: string
	description: string
	id: string
	userName: string
	userId: string
}

function Topic(props: TopicProps) {
	const {
		title,
		description,
		id,
		userName,
		userId,
	} = props

	const navigate = useNavigate()

	const [deleteTopicTrigger, deleteTopicResult] = useDeleteTopicMutation()
	const [meUserTrigger, meUserResult] = useLazyMeUserQuery()
	const [getTopicByIdTrigger, getTopicByIdResult] = useLazyGetTopicByIdQuery()
	const [deleteMessageByIdTrigger, deleteMessageByIdResult] = useDeleteMessageByIdMutation()
    const isTopicDeleteInProgress = useRef(false)

	const deleteTopicWithMessages = () => {
		isTopicDeleteInProgress.current = true
		getTopicByIdTrigger(id)
	}

	useEffect(() => {
		meUserTrigger({})
	},[meUserTrigger])

	useEffect(() => {
		console.log("meUserResult")
		console.log(meUserResult)
	},[meUserResult])

	useEffect(() => {
		if(isTopicDeleteInProgress.current == true && getTopicByIdResult?.data?.data?.attributes?.messages?.data) {
			getTopicByIdResult.data.data.attributes.messages.data.map((item:any) => {
				deleteMessageByIdTrigger(item.id)
			})
			deleteTopicTrigger(getTopicByIdResult?.data?.data?.id)
			isTopicDeleteInProgress.current = false
		}
	},[getTopicByIdResult])

	return (
		<div className={styles.todoWrapper}>
			<span className={styles.todoUser}>{userName}</span>
			<div>
				<Link className={styles.todoTitleLink} to={`/topicsMessages/${id}`}><h2 className={styles.todoTitle}>{title}</h2></Link>
			</div>
			<p className={styles.todoDescription}>
				{description}
			</p>
			{meUserResult?.data?.id && meUserResult?.data?.id == userId && (
			<span className={styles.todoDelete} onClick={deleteTopicWithMessages}>Удалить</span>)}
		</div>
	)
}

export default Topic
