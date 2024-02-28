import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/profile");

      if (response.data.error) {
        setUser(null);
        toast.error(response.data.error);
        navigate("/login");
      } else {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUserDetails();
    }
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
