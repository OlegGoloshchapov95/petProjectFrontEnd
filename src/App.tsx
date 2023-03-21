import {useRegisterUserMutation} from './redux';
import {useEffect} from "react";
import {useForm, Controller} from "react-hook-form"

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
            "username": data.userName? data.userName : "",
            "email": data.email? data.email : "",
            "password": data.password? data.password : ""
        })
    }

    useEffect(() => {
        console.log(JSON.stringify(registerUserResult))
    }, [registerUserResult])

    return (
        <div>
            <h1>Hello world! test commit</h1>
            <form
                className={"form-block"}
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <div className={"form-item"}>
                    <label>User name</label>
                    <Controller
                        render={({field, fieldState}) => {
                            return (
                                <input
                                    {...(field && {...field})}
                                    type="text"
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
                                <input
                                    {...(field && {...field})}
                                    type="text"
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
                                <input
                                    {...(field && {...field})}
                                    type="text"
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
