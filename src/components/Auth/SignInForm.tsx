import styles from "./Auth.module.scss"
import {cc} from "../../utils/Classnames"
import {useAuthUserMutation} from '../../redux'
import {Controller, useForm} from "react-hook-form"
import InputText from "../Input/InputText"
import {useEffect} from "react"
import Link from "../Link/Link";
import WhiteButton from "../AuthButton/WhiteButton"
import {useNavigate} from "react-router-dom"

interface SignInFormProps {
}

type FormData = {
    identifier: string
    password: string
}

function SignInForm(props: SignInFormProps) {
    const {} = props

    const [authUserTrigger, authUserResult] = useAuthUserMutation()

    const navigate = useNavigate()

    const {handleSubmit, control} = useForm<FormData>({
        mode: "onChange",
    })

    const onFormSubmit = (data: FormData) => {
        authUserTrigger({
            "identifier": data.identifier ? data.identifier : "",
            "password": data.password ? data.password : ""
        })
    }

    useEffect(() => {
        console.log(authUserResult)
        if (authUserResult?.data?.jwt) {
            localStorage.setItem("bearerTokenForForum", `Bearer ${authUserResult.data.jwt}`)
            navigate("/topics")
        }
    }, [authUserResult])

    return (
        <form
            className={styles["form-block"]}
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <h2>Sign in</h2>
            <div className={styles["form-item"]}>
                <label>User name or email</label>
                <Controller
                    render={({field, fieldState}) => {
                        return (
                            <InputText
                                field={field}
                                type="text"
                                fullWidth="full"
                                placeholder={"user name or email"}
                            />
                        )
                    }}
                    name="identifier"
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
                authUserResult?.error?.data?.error?.message &&
                //@ts-ignore
                <div className={styles.errorBlock}>{authUserResult?.error?.data?.error?.message}</div>}
            <WhiteButton isSubmit={true} isNotFullWith={true} className={styles.sendButton}>Send</WhiteButton>
            <Link to="/" className={styles.linkTo}>Sign up</Link>
        </form>
    )
}

export default SignInForm
