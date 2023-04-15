import {Route, Routes, useNavigate} from "react-router-dom"
import SignInForm from "./components/Auth/SignInForm"
import SignUpForm from "./components/Auth/SignUpForm"
import TopicsPage from "./components/TopicsPage/TopicsPage"
import {useEffect} from "react"

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("bearerTokenForTodos")) {
            navigate("/topics")
        }
    },[navigate])

    return (
        <div className="appWrapper">
            <Routes>
                <Route path='/' element={<SignUpForm/>}/>
                <Route path='/signIn' element={<SignInForm/>}/>
                <Route path='/topics' element={<TopicsPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
