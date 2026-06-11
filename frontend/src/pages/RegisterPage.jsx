import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/RegisterPage.css"
import {Link} from "react-router";
import api from "../services/api.js";

export function RegisterPage(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleRegister(event){

       event.preventDefault();
       setError("");

        if (!email.includes("@")){
            setError("Invalid email");
            return;
        }

        const registerData = {
           email,
           username,
           password
       };

       try {
           const response = await api.post(
               "/auth/register",
               registerData
           );

           console.log(response.data);
           console.log("User created");

           navigate("/login");

       } catch (error){

           if (error.response?.status === 409) {
               setError(error.response.data);
               return;
           }

           setError("Could not register user.");
       }

    }


    return (
        <div className={"auth-page"}>
            <div className={"register-container"}>

                <h1>Register</h1>
                {error && <p style = {{color:'red'}}>{error}</p>}

                   <form onSubmit={handleRegister}>
                    <input
                        className={"register-input"}
                        type={"email"}
                        placeholder={"email"}
                        size="30"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                    className={"register-input"}
                    type={"text"}
                    placeholder={"username"}
                    size="30"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    />

                    <input
                    className={"register-input"}
                    type={"password"}
                    placeholder={"password"}
                    size="30"
                    value={password}
                    onChange={(event) => setPassword(event.target.value
                    )}
                    />

                <button className={"register-button"} type={"submit"}>Register</button>
                </form>

                <Link to={"/login"} className={"login-link"}>
                    Already have an account?
                </Link>
            </div>

        </div>
    );
}
