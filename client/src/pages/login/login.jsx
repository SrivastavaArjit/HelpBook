import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setEmail("");
        setPassword("");
        toast.success("Logged In Successfully!");
        navigate("/agent");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="login-card">
      <h2 className="login-header">Login to your account</h2>
      <form action="post" className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="uemail">Email</label>
          <input
            type="text"
            id="uemail"
            name="name"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="upassword">Password</label>
          <input
            type="password"
            id="upassword"
            name="name"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-checkbox">
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            value="true"
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>

        <input type="submit" value="Login" />
      </form>
      <a
        href="http://localhost:3000/users/auth/facebook"
        type="button"
        className="btn btn-primary fb-btn"
      >
        Login with
        <FontAwesomeIcon
          icon={faSquareFacebook}
          style={{ marginLeft: "5px" }}
        />
      </a>
      <div className="log-in">
        New to MyApp? <a href="/register">Sign Up</a>
      </div>
    </div>
  );
}

export default Login;
