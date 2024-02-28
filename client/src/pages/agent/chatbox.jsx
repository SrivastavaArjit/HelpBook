// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

function Chatbox() {
  // const [user, setUser] = useState(null);
  // const navigate = useNavigate();
  // axios.defaults.withCredentials = true;

  // const getUserDetail = async () => {
  //   const response = await axios.get("http://localhost:3000/users/profile");
  //   if (response.data.error) {
  //     setUser(null);
  //     toast.error(response.data.error);
  //     navigate("/login");
  //   } else {
  //     setUser(response.data);
  //   }
  // };
  // useEffect(() => {
  //   if (!user) {
  //     getUserDetail();
  //   }
  // }, []);
  const { user } = useContext(UserContext);
  console.log("user: ", user);
  return (
    <div className="chatbox">
      <div className="d-flex chatbox-header">
        <div className="username">{user ? user.name : "Username"}</div>
      </div>
      <div className="chat-room"></div>
      <div className="chatbox-footer">
        <input type="text" placeholder="Message Username" />
      </div>
    </div>
  );
}

export default Chatbox;
