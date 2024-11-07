import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";

export const Verification = () => {
  const [changeForm, setChangeForm] = useState(true);
  const [formName, setFormName] = useState(true);
  const handleToggle = () => {
    setChangeForm(!changeForm);
  };

  return (
    <div className="container pt-[10rem]">
      <div className="container flex flex-col gap-2 mx-auto items-center justify-center bg-gray-800 rounded-xl shadow-lg shadow-gray-500 w-fit px-3 py-4">
        <h1 className="text-green-600 font-bold">Verification</h1>
        {formName ? (
          <>
            <Login />
            <p className="text-[0.9em]">
              Don't have an account?{" "}
              <button
                className=" text-white py-1 text-[0.9em] underline"
                onClick={() => setFormName(false)}
              >
                register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="text-[0.9em]">
              Already have an account?{" "}
              <button
                className="text-white text-[0.9em] py-1 underline"
                onClick={() => setFormName(true)}
              >
                login
              </button>
            </p>
          </>
        )}
        <button onClick={handleToggle}>{formName}</button>
      </div>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigateto = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = "http://127.0.0.1:8000/api/user/create/";
      const res = await axios.post(url, {
        name: username,
        email: email,
        password: password,
      });
      navigateto("/");
      console.log(res.data);
    } catch (error) {
      if (error.response && error.response === 400) {
        const errorMessage = error.response.data.email[0];
        setMessage(errorMessage);
      } else {
        setMessage("An error occurred");
      }
    }
  };
  return (
    <div className="container flex flex-col gap-2 mx-auto items-center justify-center">
      <h1>Create Account</h1>
      {message && <p className="text-red-600">{message}</p>}
      <form
        onSubmit={handleRegister}
        className="container flex flex-col gap-4 mx-auto items-center justify-center text-black font-semibold"
      >
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="font-light text-black outline-1 outline-green-600 py-1 rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />

        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="font-light text-black outline-1 outline-green-600 py-1 rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />

        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="font-light text-black outline-1 outline-green-600 py-1 rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />
        <button
          type="submit"
          className="font-light bg-green-600 hover:bg-green-800 text-white w-full py-2 px-3 rounded-xl shadow-xl shadow-gray-900"
        >
          Register
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigateto = useNavigate();
  const { setGetUserName, setIsAuth } = useContext(GlobalContext);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token_url = "http://127.0.0.1:8000/api/user/token/";
      const token_res = await axios.post(token_url, {
        email: email,
        password: password,
      });
      const token = token_res.data.token;
      localStorage.setItem("token", token);
      setIsAuth(true);

      const get_url = "http://127.0.0.1:8000/api/user/me/";
      const get_res = await axios.get(get_url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const user = get_res.data.name;
      if (user) {
        setGetUserName(user);
        localStorage.setItem("user", user);
      } else {
        setGetUserName("");
      }
      navigateto("/");
      setMsg("Login Successfull");
    } catch (error) {
      setMsg(error.message);
    }
  };
  return (
    <div className="container flex flex-col gap-2 mx-auto items-center justify-center">
      <h1>Login</h1>
      {msg && <p className="text-red-600">{msg}</p>}
      <form
        onSubmit={handleLogin}
        className="container flex flex-col gap-4 mx-auto items-center justify-center text-black font-semibold"
      >
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="font-light text-black outline-1 outline-green-600 py-1 rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />

        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="font-light text-black outline-1 outline-green-600 py-1 rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />
        <button
          type="submit"
          className="font-light bg-green-600 hover:bg-green-800 text-white w-full py-2 px-3 rounded-xl shadow-xl shadow-gray-900"
        >
          Login
        </button>
      </form>
    </div>
  );
};
