import styles from "./CreateTopic.module.scss"
import {cc} from "../../utils/Classnames"
import {useCreateTopicMutation, useLazyMeUserQuery} from '../../redux'
import {Controller, useForm} from "react-hook-form"
import InputText from "../Input/InputText"
import WhiteButton from "../AuthButton/WhiteButton"
import {useEffect} from "react"

interface CreateTopicProps {
}

type FormData = {
	title: string
	description: string
}

function CreateTopic(props: CreateTopicProps) {
	const {
	} = props

	const [createTopicTrigger, createTopicResult] = useCreateTopicMutation()
	const [meUserTrigger, meUserResult] = useLazyMeUserQuery()

	const {handleSubmit, control} = useForm<FormData>({
		mode: "onChange",
	})

	useEffect(() => {
		meUserTrigger({})
	},[meUserTrigger])

	const onFormSubmit = (data: FormData) => {
		createTopicTrigger({
			data: {
				"title": data.title,
				"description": data.description,
				"user": meUserResult?.data? meUserResult.data : ""
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
				createTopicResult?.error?.data?.error?.message &&
				//@ts-ignore
				<div className={styles.errorBlock}>{createTopicResult?.error?.data?.error?.message}</div>}
			<WhiteButton isSubmit={true} isNotFullWith={true} className={styles.sendButton}>Create new todo</WhiteButton>
		</form>
	)
}

export default CreateTopic
