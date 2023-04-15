import styles from "./Topic.module.scss"
import {useDeleteTopicMutation} from '../../redux'
import {cc} from "../../utils/Classnames"
import Link from "../Link/Link";

interface TopicProps {
	title: string
	description: string
	id: string
	userName: string
}

function Topic(props: TopicProps) {
	const {
		title,
		description,
		id,
		userName,
	} = props

	const [deleteTopicTrigger, deleteTopicResult] = useDeleteTopicMutation()

	return (
		<div className={styles.todoWrapper}>
			<span className={styles.todoUser}>{userName}</span>
			<Link to='/topicsMessages'><h2 className={styles.todoTitle}>{title}</h2></Link>
			<p className={styles.todoDescription}>
				{description}
			</p>
			<span className={styles.todoDelete} onClick={() => {
				deleteTopicTrigger(id)
			}}>Удалить</span>
		</div>
	)
}

export default Topic
