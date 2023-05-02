import styles from "./TopicsPage.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate} from "react-router-dom"
import CreateTopic from "../CreateTopic/CreateTopic"
import {useLazyGetTopicsQuery} from '../../redux'
import {useEffect} from "react"
import Topic from "../Topic/Topic"

interface TopicsPageProps {
}

function TopicsPage(props: TopicsPageProps) {
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
				localStorage.removeItem("bearerTokenForForum")
				navigate("/")
			}}>Logout
			</button>
			<h1>Forum</h1>
			{getTopicsResult?.data?.data && getTopicsResult?.data?.data.map((item:any, index:number) => {
				return <>
					<Topic userName={item.attributes.user.username} id={item.id} title={item.attributes.title} description={item.attributes.description? item.attributes.description : ""} userId={item?.attributes?.user?.id? item.attributes.user.id : ""}/>
				</>
			})}
            <CreateTopic/>
		</div>
	)
}

export default TopicsPage
