import styles from "./CreateTodo.module.scss"
import {cc} from "../../utils/Classnames"
import {useCreateTodoMutation} from '../../redux'
import {Controller, useForm} from "react-hook-form"
import InputText from "../Input/InputText"
import WhiteButton from "../AuthButton/WhiteButton"

interface CreateTodoProps {
}

type FormData = {
	title: string
}

function CreateTodo(props: CreateTodoProps) {
	const {
	} = props

	const [createTodoTrigger, createTodoResult] = useCreateTodoMutation()

	const {handleSubmit, control} = useForm<FormData>({
		mode: "onChange",
	})

	const onFormSubmit = (data: FormData) => {
		createTodoTrigger({
			data: {
				"title": data.title ? data.title : ""
			}
		})
	}

	return (
		<form
			className={styles["form-block"]}
			onSubmit={handleSubmit(onFormSubmit)}
		>
			<h2>Create todo</h2>
			<div className={styles["form-item"]}>
				<label>title</label>
				<Controller
					render={({field, fieldState}) => {
						return (
							<InputText
								field={field}
								type="text"
								fullWidth="full"
								placeholder={"title"}
							/>
						)
					}}
					name="title"
					control={control}
					defaultValue={""}
				/>
			</div>
			<WhiteButton isSubmit={true} isNotFullWith={true} className={styles.sendButton}>Create new todo</WhiteButton>
		</form>
	)
}

export default CreateTodo