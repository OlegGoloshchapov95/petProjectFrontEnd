import {Route, Routes, useNavigate} from "react-router-dom"
import SignInForm from "./components/Auth/SignInForm"
import SignUpForm from "./components/Auth/SignUpForm"
import TodosPage from "./components/TodosPage/TodosPage"
import {useEffect} from "react"

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("bearerTokenForTodos")) {
            navigate("/todos")
        }
    },[localStorage.getItem("bearerTokenForTodos")])

    return (
        <div className="appWrapper">
            <Routes>
                <Route path='/' element={<SignUpForm/>}/>
                <Route path='/signIn' element={<SignInForm/>}/>
                <Route path='/todos' element={<TodosPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
