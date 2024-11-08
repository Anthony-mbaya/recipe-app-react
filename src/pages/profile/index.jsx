import { useEffect, useState } from "react";
import { FaPen, FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";
import axios from "axios";
import "ldrs/ring";
import { NavLink } from "react-router-dom";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expand1, setExpand1] = useState(false);
  const fetchData = async () => {
    setLoader(true);
    try {
      const url = "http://127.0.0.1:8000/api/user/me/";

      const res = await axios.get(url, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      setName(res.data.name);
      setEmail(res.data.email);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //console.log(name, email);
  if (loader) {
    //ring loader from ldrs
    return (
      <div className="flex items-center justify-center pt-[10rem]">
        <l-ring size="40" color="coral"></l-ring>
      </div>
    );
  }

  return (
    <div className="profile container mx-auto h-screen pt-[9rem] flex flex-col gap-11 sm:gap-4">
      <h1 className="text-2xl sm:text-xl font-bold">Settings</h1>
      <div className="flex items-center justify-between h-2 px-2 sm:py-8 sm:px-1 sm:w-3/5 md:w-2/5 sm:gap-10 rounded-2xl">
        <div className="flex gap-2">
          <img
            src="src/images/avatar.jpg"
            alt="avatar"
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-2xl">{name}</h2>
            <h3 className="text-sm">{email}</h3>
          </div>
        </div>
        <NavLink
          to={"/profile-edit"}
          className="px-4 py-4 rounded-full cursor-pointer border-2 border-green-600 text-white flex justify-center items-center"
        >
          {" "}
          <FaPen size={10} />{" "}
        </NavLink>
      </div>
      <ul className="pt-5 flex flex-col gap-5 text-xl sm:grid grid-cols-2">
        <li
          onClick={() => setExpand(!expand)}
          className="relative text-sm hover:text-slate-400 flex justify-between items-center bg-green-900 px-4 py-5 shadow-xl shadow-black rounded-xl"
        >
          Messages
          {expand ? <FaAngleUp /> : <FaAngleDown />}
          {expand ? (
            <div className="fixed top-[30%] left-[10%] p-3 text-black rounded-e-md flex flex-col gap-2 w-[80%] h-[50%] bg-white opacity-90  ">
              <button className="w-full flex justify-end">
                <FaTimes onClick={() => setExpand(false)} />
              </button>
              <div className="px-1 rounded-md border-2 border-green-600">
                <p className="text-sm w-full ">Hello friend</p>
                <strong>User13</strong>
              </div>
              <div className="px-1 rounded-md border-2 border-green-600">
                <p className="text-sm w-full ">
                  I viewed your rewcipe last week
                </p>
                <strong>User3</strong>
              </div>
              <div className="px-1 rounded-md border-2 border-green-600">
                <p className="text-sm w-full ">Hello, I like your reciped</p>
                <strong>User1</strong>
              </div>
            </div>
          ) : (
            ""
          )}
        </li>
        <li
          onClick={() => setExpand1(!expand1)}
          className="hover:text-slate-400 text-sm flex justify-between items-center bg-orange-900 px-4 py-5 shadow-xl shadow-black rounded-xl"
        >
          Subscriptions
          {expand1 ? <FaAngleUp /> : <FaAngleDown />}
          {expand1 ? (
            <div className="fixed top-[30%] left-[10%] p-3 text-black rounded-e-md flex flex-col gap-2 w-[80%] h-[50%] bg-white opacity-90  ">
              <button className="w-full flex justify-end">
                <FaTimes onClick={() => setExpand1(false)} />
              </button>
              <div className="px-1 rounded-md border-2 border-green-600">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Desserts</h3>
                  <p className="text-gray-500">
                    Receive updates on new dessert recipes.
                  </p>
                </div>
                <button className="px-4 py-2 text-sm text-red-600 bg-red-100 hover:bg-red-200 rounded-md">
                  Unsubscribe
                </button>
              </div>
              <div className="px-1 rounded-md border-2 border-green-600">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Healthy Recipes
                  </h3>
                  <p className="text-gray-500">
                    Stay updated on the latest healthy recipes.
                  </p>
                </div>
                <button className="px-4 py-2 text-sm text-red-600 bg-red-100 hover:bg-red-200 rounded-md">
                  Unsubscribe
                </button>
              </div>


            </div>
          ) : (
            ""
          )}
        </li>
        <li className="hover:text-slate-400 text-sm flex justify-between items-center bg-blue-800 px-4 py-5 shadow-xl shadow-black rounded-xl">
          Friends <FaAngleDown />{" "}
        </li>
        <li className="hover:text-slate-400 text-sm flex justify-between items-center bg-black px-4 py-5 shadow-xl shadow-black rounded-xl">
          Support <FaAngleDown />{" "}
        </li>
      </ul>
    </div>
  );
};
