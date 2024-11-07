import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useContext, useEffect } from "react";

export const Logout = () => {
  const navigate = useNavigate();
  const { setGetUserName } = useContext(GlobalContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setGetUserName("");
    navigate("/");
  }, [navigate, setGetUserName]);

  return null;
};
