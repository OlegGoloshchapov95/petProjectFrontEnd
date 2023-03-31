import styles from "./Auth.module.scss"
import {cc} from "../../utils/Classnames"
import {useRegisterUserMutation} from '../../redux'
import {Controller, useForm} from "react-hook-form"
import InputText from "../Input/InputText"
import {useEffect} from "react"
import Link from "../Link/Link";
import WhiteButton from "../AuthButton/WhiteButton"
import {useNavigate} from "react-router-dom"

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

	const navigate = useNavigate()

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
		if(registerUserResult?.data?.jwt) {
			localStorage.setItem("bearerTokenForTodos", `Bearer ${registerUserResult.data.jwt}`)
			navigate("/todos")
		}
	}, [registerUserResult])

	return (
		<form
			className={styles["form-block"]}
			onSubmit={handleSubmit(onFormSubmit)}
		>
			<h2>Sign up</h2>
			<div className={styles["form-item"]}>
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
			<div className={styles["form-item"]}>
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
			<div className={styles["form-item"]}>
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
			{
				//@ts-ignore
				registerUserResult?.error?.data?.error?.message &&
				//@ts-ignore
				<div className={styles.errorBlock}>{registerUserResult?.error?.data?.error?.message}</div>}
			<WhiteButton isSubmit={true} isNotFullWith={true} className={styles.sendButton}>Send</WhiteButton>
			<Link to="/signIn" className={styles.linkTo}>Sign in</Link>
		</form>
	)
}

export default SignUpForm
