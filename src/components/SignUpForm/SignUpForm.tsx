import styles from "./SignUpForm.module.scss"
import {cc} from "../../utils/Classnames"
import {useRegisterUserMutation} from '../../redux'
import {Controller, useForm} from "react-hook-form"
import InputText from "../Input/InputText"
import {useEffect} from "react"
import Link from "../Link/Link";

interface SignUpFormProps {
}

type FormData = {
	userName: string
	email: string
	password: string
}

function SignUpForm(props: SignUpFormProps) {
	const {
	} = props

	const [registerUserTrigger, registerUserResult] = useRegisterUserMutation()

	const {handleSubmit, control} = useForm<FormData>({
		mode: "onChange",
	})

	const onFormSubmit = (data: FormData) => {
		registerUserTrigger({
			"username": data.userName ? data.userName : "",
			"email": data.email ? data.email : "",
			"password": data.password ? data.password : ""
		})
	}

	useEffect(() => {
		registerUserResult?.data?.jwt && localStorage.setItem("bearerTokenForTodos", `Bearer ${registerUserResult.data.jwt}`)
	}, [registerUserResult])

	return (
		<form
			className={"form-block"}
			onSubmit={handleSubmit(onFormSubmit)}
		>
			<h2>Sign up</h2>
			<div className={"form-item"}>
				<label>User name</label>
				<Controller
					render={({field, fieldState}) => {
						return (
							<InputText
								field={field}
								type="text"
								fullWidth="full"
								placeholder={"user name"}
							/>
						)
					}}
					name="userName"
					control={control}
					defaultValue={""}
				/>
			</div>
			<div className={"form-item"}>
				<label>Email</label>
				<Controller
					render={({field, fieldState}) => {
						return (
							<InputText
								field={field}
								type="text"
								fullWidth="full"
								placeholder={"email"}
							/>
						)
					}}
					name="email"
					control={control}
					defaultValue={""}
				/>
			</div>
			<div className={"form-item"}>
				<label>Password</label>
				<Controller
					render={({field, fieldState}) => {
						return (
							<InputText
								field={field}
								type="password"
								fullWidth="full"
								placeholder={"password"}
							/>
						)
					}}
					name="password"
					control={control}
					defaultValue={""}
				/>
			</div>
			<button type="submit">Send</button>
			<Link to="/signIn">Sign in</Link>
		</form>
	)
}

export default SignUpForm
