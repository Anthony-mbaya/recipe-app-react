import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const fetch_url = "http://127.0.0.1:8000/api/user/me/";
      const res = await axios.get(fetch_url, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const user = res.data;
      setName(user.name);
      setEmail(user.email);
    } catch (error) {
      setMessage(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handlePutData = async (e) => {
    e.preventDefault();
    // handle confirm password
    if(!name || !email || !password){
      setMessage("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const put_url = "http://127.0.0.1:8000/api/user/me/";
      const payload = {
        name: name,
        email: email,
        password: password,
      };
      const res = await axios.put(put_url, payload, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        //setSuccess('Successful changes made!')
        navigate("/profile", {state: {message: 'Successful changes made!'}});
      }
    } catch (error) {
      console.error(error);
      setMessage(error);
    }
  };

  return (
    <div className="container pt-[10rem] flex flex-col gap-2 mx-auto items-center justify-center">
      <form
        onSubmit={handlePutData}
        className="container flex flex-col gap-4 mx-auto items-center justify-center text-black font-semibold"
      >
        <h1 className="text-white text-2xl">Edit Profile</h1>
        {message && <p className='text-red-600/100 w-full bg-white text-sm font-normal text-center rounded-md py-1'>{message}</p>}
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-2 border-transparent border-b-white font-light text-white  py-1 outline-none rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border-2 border-transparent border-b-white font-light text-white  py-1 outline-none rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border-2 border-transparent border-b-white font-light text-white  py-1 outline-none rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-transparent border-2 border-transparent border-b-white font-light text-white  py-1 outline-none rounded-xl sm:w-96 w-64 text-center bg-gray-300 shadow-xl shadow-gray-900"
        />
        <button
          type="submit"
          className="font-light bg-green-600 hover:bg-green-800 text-white w-64 py-2 px-3 rounded-xl shadow-xl shadow-gray-900"
        >
          Save
        </button>
      </form>
    </div>
  );
};
