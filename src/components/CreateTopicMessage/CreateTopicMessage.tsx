import styles from "./CreateTopicMessage.module.scss"
import {cc} from "../../utils/Classnames"
import {useCreateMessageMutation, useLazyMeUserQuery} from '../../redux'
import {Controller, useForm} from "react-hook-form"
import InputText from "../Input/InputText"
import WhiteButton from "../AuthButton/WhiteButton"
import {useEffect} from "react"
import {useParams} from "react-router-dom"

interface CreateTopicMessageProps {
}

type FormData = {
    textOfMessage: string
}

function CreateTopicMessage(props: CreateTopicMessageProps) {
    const {} = props

    const [createMessageTrigger, createMessageResult] = useCreateMessageMutation()
    const [meUserTrigger, meUserResult] = useLazyMeUserQuery()
    const {topic_id} = useParams()

    const {handleSubmit, control} = useForm<FormData>({
        mode: "onChange",
    })

    useEffect(() => {
        meUserTrigger({})
    }, [meUserTrigger])

    const onFormSubmit = (data: FormData) => {
        if (topic_id) {
            createMessageTrigger({
                data: {
                    "textOfMessage": data.textOfMessage,
                    "topic": topic_id,
                    "user": meUserResult?.data ? meUserResult.data : ""
                }
            })
        }
    }

    return (
        <form
            className={styles["form-block"]}
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <h2>Create message</h2>
            <div className={styles["form-item"]}>
                <label>text of message</label>
                <Controller
                    render={({field, fieldState}) => {
                        return (
                            <InputText
                                field={field}
                                type="text"
                                fullWidth="full"
                                placeholder={"text of message"}
                            />
                        )
                    }}
                    name="textOfMessage"
                    control={control}
                />
            </div>
            {
                //@ts-ignore
                createMessageResult?.error?.data?.error?.message &&
                //@ts-ignore
                <div className={styles.errorBlock}>{createMessageResult?.error?.data?.error?.message}</div>}
            <WhiteButton isSubmit={true} isNotFullWith={true} className={styles.sendButton}>Create new
                message</WhiteButton>
        </form>
    )
}

export default CreateTopicMessage
