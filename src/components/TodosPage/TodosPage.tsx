import styles from "./InputText.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate} from "react-router-dom"

interface TodosPageProps {
}

function TodosPage(props: TodosPageProps) {
	const {
	} = props

	const navigate = useNavigate()

	return (
		<div>
			<button onClick={() => {
				localStorage.removeItem("bearerTokenForTodos")
				navigate("/")
			}}>Logout
			</button>
		</div>
	)
}

export default TodosPage
