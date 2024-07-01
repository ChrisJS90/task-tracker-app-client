import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './SignIn.css'
import backUrl from '../../utils.js'
import { useAuth } from "../../utils/authentication.js"


const SignIn = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })
    const { dispatch } = useAuth()

    function handleChange(event) {
        const inputName = event.target.name
        const inputValue = event.target.value

        if (inputName === "email") {
            setUser({ ...user, email: inputValue });
        } else if (inputName === "password") {
            setUser({ ...user, password: inputValue })
        }

        // As the backend has not been set up, this console log simply checks functionality
        console.log(user)
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch(`http://localhost:4000/users/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers:{"Content-Type": "application/json"}
        } )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log("response data", data);
                console.log("token?", data.token)
                if(data && data.data && data.data.token) {
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            token: data.data.token,
                            user: data.data.user
                        }
                    })
                    console.log("got token")
                    setUser({...user, token: data.data.token})
                    console.log(data.data.user)
                    localStorage.setItem("Token", data.data.token)
                    localStorage.setItem("User", JSON.stringify(data.data.user))
                    navigate("/dashboard")
                }

            })
    }



    return (
        <div className="background">
            <div className="sign-in">
                <p>
                    <input type="text" name="email" placeholder="email@email.com" onChange={handleChange} />
                </p>
                <p>
                    <input type="password" name="password" placeholder="password" onChange={handleChange} />
                </p>
                <p>
                    <button onClick={handleSubmit}>Sign in</button>
                </p>

            </div>
        </div>
    )
}

export default SignIn