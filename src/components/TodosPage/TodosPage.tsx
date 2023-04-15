import styles from "./InputText.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate} from "react-router-dom"
import CreateTodo from "../CreateTodo/CreateTodo"
import {useLazyGetTopicsQuery} from '../../redux'
import {useEffect} from "react"
import Todo from "../Todo/Todo";

interface TodosPageProps {
}

function TodosPage(props: TodosPageProps) {
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

			<CreateTodo/>

			{getTopicsResult?.data?.data && getTopicsResult?.data?.data.map((item:any, index:number) => {
				return <>
					<Todo userName={item.attributes.user.username} id={item.id} title={item.attributes.title} description={item.attributes.description? item.attributes.description : ""}/>
				</>
			})}
		</div>
	)
}

export default TodosPage
