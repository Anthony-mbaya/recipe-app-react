import { useEffect, useState } from "react";
import { FaPen, FaAngleDown } from "react-icons/fa";
import axios from "axios";
import 'ldrs/ring';
import { NavLink } from "react-router-dom";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
    const fetchData = async () => {
      setLoader(true);
        try{
        const url = "http://127.0.0.1:8000/api/user/me/";


        const res = await axios.get(url, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });

        setName(res.data.name);
        setEmail(res.data.email);
        setLoader(false);
    }catch(error){
        console.log(error);
        setLoader(false);
    }};
  useEffect(() => {
    fetchData();
  }, [])
  console.log(name, email);
  if(loader){
    //ring loader from ldrs
    return <div className="flex items-center justify-center pt-[10rem]"><l-ring size='40' color='coral'></l-ring></div>;
}

  return (
    <div className="profile container mx-auto h-screen pt-[10rem] flex flex-col gap-2">
      <h1 className="text-2xl sm:text-xl font-bold">Settings</h1>
      <div className="flex items-center justify-between h-24 bg-slate-700 px-2 sm:py-8 sm:px-10 sm:w-fit sm:gap-10 rounded-2xl">
        <div className="flex gap-2">
          <img
            src="src/images/avatar.jpg"
            alt="avatar"
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-2xl">{name}</h2>
            <h3>{email}</h3>
          </div>
        </div>
        <NavLink to={'/profile-edit'} className="px-4 py-4 rounded-full cursor-pointer bg-red-600 flex justify-center items-center">
          {" "}
          <FaPen size={25} />{" "}
        </NavLink>
      </div>
      <ul className="pt-5 flex flex-col gap-5 text-xl sm:grid grid-cols-2">
        <li className="hover:text-slate-400 flex justify-between items-center bg-green-900 px-4 py-5 shadow-xl shadow-black rounded-xl">Messages <FaAngleDown /> </li>
        <li className="hover:text-slate-400 flex justify-between items-center bg-orange-900 px-4 py-5 shadow-xl shadow-black rounded-xl">Subscriptions <FaAngleDown /> </li>
        <li className="hover:text-slate-400 flex justify-between items-center bg-blue-800 px-4 py-5 shadow-xl shadow-black rounded-xl">Friends <FaAngleDown /> </li>
        <li className="hover:text-slate-400 flex justify-between items-center bg-black px-4 py-5 shadow-xl shadow-black rounded-xl">Support <FaAngleDown /> </li>
      </ul>
    </div>
  );
};
