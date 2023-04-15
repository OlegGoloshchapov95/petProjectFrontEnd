import styles from "./TopicsMessagesPage.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate} from "react-router-dom"
import CreateTopic from "../CreateTopic/CreateTopic"
import {useLazyGetTopicsQuery} from '../../redux'
import {useEffect} from "react"
import Topic from "../Topic/Topic"

interface TopicMessagesPageProps {
}

function TopicMessagesPage(props: TopicMessagesPageProps) {
	const {
	} = props

	const navigate = useNavigate()
	const [getTopicsTrigger, getTopicsResult] = useLazyGetTopicsQuery()

    useEffect(() => {
		getTopicsTrigger({})
	}, [getTopicsTrigger])

	useEffect(() => {
		console.log("getTopicsResult")
		console.log(getTopicsResult)
	}, [getTopicsResult])

	return (
		<div>
			<button onClick={() => {
				localStorage.removeItem("bearerTokenForTodos")
				navigate("/")
			}}>Logout
			</button>

			<CreateTopic/>

			{getTopicsResult?.data?.data && getTopicsResult?.data?.data.map((item:any, index:number) => {
				return <>
					<Topic userName={item.attributes.user.username} id={item.id} title={item.attributes.title} description={item.attributes.description? item.attributes.description : ""}/>
				</>
			})}
		</div>
	)
}

export default TopicMessagesPage