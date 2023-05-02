import styles from "./TopicsMessagesPage.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate, useParams} from "react-router-dom"
import {useLazyGetTopicByIdQuery} from '../../redux'
import {useEffect} from "react"
import CreateTopicMessage from "../CreateTopicMessage/CreateTopicMessage"
import Message from "../Message/Message"
import Link from "../Link/Link"

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
				localStorage.removeItem("bearerTokenForForum")
				navigate("/")
			}}>Logout
			</button>
			{getTopicByIdResult?.data?.data?.attributes?.title && (<h2><Link className={styles.forumWord} to={"/topics"}>Forum</Link> {'>'} {getTopicByIdResult.data.data.attributes.title}</h2>)}
			{getTopicByIdResult?.data?.data?.attributes?.description && (<p>{getTopicByIdResult.data.data.attributes.description}</p>)}
			{getTopicByIdResult?.data?.data?.attributes?.messages?.data && (getTopicByIdResult.data.data.attributes.messages.data.map((item:any) => {
				return <>
					<Message userName={item.attributes?.user?.username? item.attributes.user.username : ""} id={item.id} description={item.attributes.textOfMessage? item.attributes.textOfMessage : ""} userId={item?.attributes?.user?.id? item.attributes.user.id : ""}/>
				</>
			}))}
			<CreateTopicMessage/>
		</div>
	)
}

export default TopicMessagesPage
