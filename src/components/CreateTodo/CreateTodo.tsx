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
	description: string
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
				"title": data.title,
				"description": data.description
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
				/>
			</div>
			<div className={styles["form-item"]}>
				<label>description</label>
				<Controller
					render={({field, fieldState}) => {
						return (
							<InputText
								field={field}
								type="text"
								fullWidth="full"
								placeholder={"description"}
							/>
						)
					}}
					name="description"
					control={control}
				/>
			</div>
			{
				//@ts-ignore
				createTodoResult?.error?.data?.error?.message &&
				//@ts-ignore
				<div className={styles.errorBlock}>{createTodoResult?.error?.data?.error?.message}</div>}
			<WhiteButton isSubmit={true} isNotFullWith={true} className={styles.sendButton}>Create new todo</WhiteButton>
		</form>
	)
}

export default CreateTodo
