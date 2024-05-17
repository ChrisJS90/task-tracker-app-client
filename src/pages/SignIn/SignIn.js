import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './SignIn.css'


const SignIn = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })

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
                    <button onClick={() => navigate("/dashboard")}>Sign in</button>
                </p>

            </div>
        </div>
    )
}

export default SignIn