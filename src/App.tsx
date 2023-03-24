import {Route, Routes} from 'react-router-dom'
import SignInForm from "./components/Auth/SignInForm"
import SignUpForm from "./components/Auth/SignUpForm"

function App() {
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
        </div>
    );
}

export default App;
