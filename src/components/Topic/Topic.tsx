import styles from "./Topic.module.scss"
import {useDeleteTopicMutation, useLazyMeUserQuery} from '../../redux'
import {cc} from "../../utils/Classnames"
import Link from "../Link/Link"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react";

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
			<div>
				<Link className={styles.todoTitleLink} to={`/topicsMessages/${id}`}><h2 className={styles.todoTitle}>{title}</h2></Link>
			</div>
			<p className={styles.todoDescription}>
				{description}
			</p>
			{meUserResult?.data?.id && meUserResult?.data?.id == userId && (
			<span className={styles.todoDelete} onClick={() => {
				deleteTopicTrigger(id)
			}}>Удалить</span>)}
		</div>
	)
}

export default Topic
