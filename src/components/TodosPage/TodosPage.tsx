import styles from "./InputText.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate} from "react-router-dom"
import CreateTodo from "../CreateTodo/CreateTodo"
import {useGetTodosMutation} from '../../redux'
import {useEffect} from "react";

interface TodosPageProps {
}

function TodosPage(props: TodosPageProps) {
	const {
	} = props

	const navigate = useNavigate()
	const [getTodosTrigger, getTodosResult] = useGetTodosMutation()

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
		</div>
	)
}

export default TodosPage
