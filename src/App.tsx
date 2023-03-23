import {useRegisterUserMutation} from './redux'
import {useEffect} from "react"
import {useForm, Controller} from "react-hook-form"
import InputText from "./components/Input/InputText"
import {Route, Routes} from 'react-router-dom'
import SignInForm from "./components/SignInForm/SignInForm"
import SignUpForm from "./components/SignUpForm/SignUpForm"

type FormData = {
    userName: string
    email: string
    password: string
}

function App() {
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
        <div>
            <Routes>
                <Route path='/' element={<SignUpForm/>}/>
                <Route path='/signIn' element={<SignInForm/>}/>
            </Routes>
            <button onClick={() => {
                localStorage.removeItem("bearerTokenForTodos")
            }}>Logout
            </button>
            <h2>Sign up</h2>
            <form
                className={"form-block"}
                onSubmit={handleSubmit(onFormSubmit)}
            >
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
            </form>
        </div>
    );
}

export default App;
