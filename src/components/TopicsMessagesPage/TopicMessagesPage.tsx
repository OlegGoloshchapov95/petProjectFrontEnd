import styles from "./TopicsMessagesPage.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate, useParams} from "react-router-dom"
import CreateTopic from "../CreateTopic/CreateTopic"
import {useLazyGetTopicByIdQuery} from '../../redux'
import {useEffect} from "react"
import Topic from "../Topic/Topic"
import CreateTopicMessage from "../CreateTopicMessage/CreateTopicMessage"

interface TopicMessagesPageProps {
}

function TopicMessagesPage(props: TopicMessagesPageProps) {
	const {
	} = props

	const navigate = useNavigate()
	const {topic_id} = useParams()
	const [getTopicByIdTrigger, getTopicByIdResult] = useLazyGetTopicByIdQuery()

    useEffect(() => {
		if(topic_id) {
			getTopicByIdTrigger(topic_id)
		}
	}, [getTopicByIdTrigger])

	useEffect(() => {
		console.log("topic_id")
		console.log(topic_id)
	}, [topic_id])

	useEffect(() => {
		if(getTopicByIdResult) {
			console.log("getTopicsResult")
			console.log(getTopicByIdResult)
		}
	}, [getTopicByIdResult])

	return (
		<div>
			<button onClick={() => {
				localStorage.removeItem("bearerTokenForTodos")
				navigate("/")
			}}>Logout
			</button>
			<CreateTopicMessage/>
		</div>
	)
}

export default TopicMessagesPage
