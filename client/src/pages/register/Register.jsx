import { useState } from "react";
import axios from "axios";
import "./register.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        { username, email, password, rememberme },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setUsername("");
        setEmail("");
        setPassword("");
        setRememberme(false);
        toast.success("Registered Successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-card">
      <h2 className="register-header">Create Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="uname">Name</label>
          <input
            type="text"
            id="uname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="uemail">Email</label>
          <input
            type="text"
            id="uemail"
            name="uemail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="upassword">Password</label>
          <input
            type="password"
            id="upassword"
            name="upassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-checkbox">
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            value={rememberme}
            onChange={() => {
              setRememberme(!rememberme);
            }}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>

        <input type="submit" value="Sign Up" />
      </form>

      <div className="log-in">
        Already have an Account? <a href="/">Login</a>
      </div>
    </div>
  );
}

export default Register;
