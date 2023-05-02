import {Route, Routes, useNavigate} from "react-router-dom"
import SignInForm from "./components/Auth/SignInForm"
import SignUpForm from "./components/Auth/SignUpForm"
import TopicsPage from "./components/TopicsPage/TopicsPage"
import {useEffect} from "react"
import TopicMessagesPage from "./components/TopicsMessagesPage/TopicMessagesPage"

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        if(window?.location?.pathname=="/" && localStorage.getItem("bearerTokenForForum")) {
            navigate("/topics")
        }
    },[navigate])

    return (
        <div className="appWrapper">
            <Routes>
                <Route path='/' element={<SignUpForm/>}/>
                <Route path='/signIn' element={<SignInForm/>}/>
                <Route path='/topics' element={<TopicsPage/>}/>
                <Route path='/topicsMessages/:topic_id' element={<TopicMessagesPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
