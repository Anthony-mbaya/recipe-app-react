import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useContext, useEffect } from "react";

export const Logout = () => {
  const navigate = useNavigate();
  const { setGetUserName } = useContext(GlobalContext);
  useEffect(() => {
    localStorage.removeItem("token");
    setGetUserName("");
    navigate("/login");
  }, [navigate, setGetUserName]);

  return null;
};
