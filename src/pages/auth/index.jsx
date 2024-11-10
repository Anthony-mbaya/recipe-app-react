import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
//import BASE_URL from '/api_config';
const BASE_URL = process.env.REACT_APP_API_URL;
export const Verification = () => {
  const [changeForm, setChangeForm] = useState(true);
  const [formName, setFormName] = useState(true);
  const handleToggle = () => {
    setChangeForm(!changeForm);
  };

  return (
    <div className="container pt-[10rem] sm:pt-[7rem]">
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
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    if(!username || !email || !password){
      setMessage('Please fill in all fields');
      return;
    }
    try {
      //const url = "http://127.0.0.1:8000/api/user/create/";
      const url = `${BASE_URL}/api/user/create/`;
      const res = await axios.post(url, {
        name: username,
        email: email,
        password: password,
      });
      if(res.data){
        setSuccess('User created successfully...Now Login!');
      }
      //console.log(res.data);
    } catch (error) {
      if(error.response){
        let resError = error.response.data.email[0];
        //console.log(resError);
        setMessage(resError);
      }else{
        setMessage('Server failed to respoend...Try again!')
      }
    }
  };
  //{success && <p className=" w-full bg-white text-sm font-normal text-center rounded-md py-1">{success}</p>}
  return (
    <div className="container flex flex-col gap-2 mx-auto items-center justify-center">
      <h1>Create Account</h1>
      {(message || success) && <p className={`${message ? 'text-red-600/100' : 'text-green-600/100'} w-full bg-white text-sm font-normal text-center rounded-md py-1`}>{message || success}</p>}

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
    setMsg('');
    if(!email || !password){
      setMsg('Please fill in all fields');
      return;
    }
    try {
      //const token_url = "http://127.0.0.1:8000/api/user/token/";
      const token_url = `${BASE_URL}/api/user/token/`;
      const token_res = await axios.post(token_url, {
        email: email,
        password: password,
      });
      const token = token_res.data.token;
      localStorage.setItem("token", token);
      setIsAuth(true);

      //const get_url = "http://127.0.0.1:8000/api/user/me/";
      const get_url = `${BASE_URL}/api/user/me/`;
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
      if(token_res.data && get_res.data){
        console.log('seccess');
        navigateto("/", {state: {message: 'Karibu Sana Kwenye site...haha'}});
      }
    } catch (error) {
      if(error.response){
        let resError = error.response.data.non_field_errors[0];
        setMsg(resError);
      }else{
        setMsg('Server failed to respoend...Try again!')
      }
    }
  };
  return (
    <div className="container flex flex-col gap-2 mx-auto items-center justify-center">
      <h1>Login</h1>
      {msg && <p className="text-red-600/100 w-full bg-white text-sm font-normal text-center rounded-md py-1">{msg}</p>}
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
