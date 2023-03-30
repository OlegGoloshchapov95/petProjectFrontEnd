import styles from "./InputText.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate} from "react-router-dom"
import CreateTodo from "../CreateTodo/CreateTodo"
import {useLazyGetTodosQuery} from '../../redux'
import {useEffect} from "react";

interface TodosPageProps {
}

function TodosPage(props: TodosPageProps) {
	const {
	} = props

	const navigate = useNavigate()
	const [getTodosTrigger, getTodosResult] = useLazyGetTodosQuery()

    useEffect(() => {
		getTodosTrigger({})
	}, [getTodosTrigger])

	useEffect(() => {
		console.log(getTodosResult)
	}, [getTodosResult])

	return (
		<div>
			<button onClick={() => {
				localStorage.removeItem("bearerTokenForTodos")
				navigate("/")
			}}>Logout
			</button>

			<CreateTodo/>

			{getTodosResult?.data?.data && getTodosResult?.data?.data.map((item:any, index:number) => {
				return <>
					<h2>{item.attributes.title}</h2>
					<p>
						{item.attributes.description}
					</p>
				</>
			})}
		</div>
	)
}

export default TodosPage
