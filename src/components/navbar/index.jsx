import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; //use to create routing links
import { GlobalContext } from "../../context";
import { AiFillCloseSquare, AiOutlineMenu } from "react-icons/ai";

function Navlink({ path, name, onclick }) {
  return (
    <li className="list-none">
      <NavLink
        to={path}
        className="text-white hover:text-slate-500 duration-300 px-2 py-2"
        onClick={onclick}
      >
        {name}
      </NavLink>
    </li>
  );
}
export const Navbar = () => {
  const { searchParam, setSearchParam, handleSubmit, getUserName } =
    useContext(GlobalContext);
  const [showSideBar, setShowSideBar] = useState(true);
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  //console.log(searchParam);
  return (
    <nav className="fixed top-5 left-0 right-0 flex justify-between items-center sm:py-1 container mx-auto w-full flex-col sm:gap-1 md:flex-row gap-3 lg:gap-0 bg-slate-900 bg-opacity-60">
      <h2 className="md:px-4 md:text-3xl text-2xl font-semibold text-center">
        <Navlink path={"/"} name={"[ X ] Restoo"} className="" />
      </h2>
      <form onSubmit={handleSubmit} className="sm:mx-auto sm:flex flex-col-reverse gap-1 justify-center sm:w-fit items-center">
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="search item..."
          className="bg-slate-700/75 py-2 text-center rounded-full outline-none mx-auto w-[22rem] lg:w-[44rem] shadow-lg shadow-slate-600 focus:shadow-slate-400 "
        />
        <p className="text-white text-center duration-300 px-2 sm:py-2 py-4 lg:py-5 font-extralight">
          Hello,{" "}
          <span className="text-green-600 font-extralight text-xl">
            {getUserName ? getUserName : "Guest"}
          </span>
          {" "}
          welcome back!
        </p>
      </form>
      <ul className="sm:flex gap-2 hidden text-sm mx-auto justify-center items-center">
        <Navlink path={"/"} name={"Home"} />
        <Navlink path={"/favourites"} name={"Favourites"} />
        {getUserName && getUserName.length > 1 ? (
          <>
            <Navlink path={"/profile"} name={"Profile"} />
            <Navlink path={"/logout"} name={"Logout"} />
          </>
        ) : (
          <Navlink path={"/login"} name={"Login"} />
        )}
      </ul>
      <button
        onClick={handleShowSideBar}
        className="fixed top-[8.7rem] right-9 sm:hidden"
      >
        {showSideBar && (
          <AiOutlineMenu className="text-white bg-slate-800" size={32} />
        )}
      </button>
      <div
      className={`sidebar w-3/6 fixed top-32 left-1 rounded-md lg:hidden h-screen bg-slate-700 opacity-90 font-semibold text-white transform transition duration-1000 ease-in-out  px-2
        ${showSideBar ? "-translate-x-full" : "translate-x-0" }`}
      >
        <button onClick={handleShowSideBar} className="fixed top-3 right-3">
          {!showSideBar && (
            <AiFillCloseSquare className="text-slate-800 bg-white" size={30} />
          )}
        </button>
        <ul
          className={
            showSideBar
              ? "hidden"
              : "pt-20 mx-auto w-full flex flex-col gap-4 justify-center items-start px-6"
          }
        >
          <Navlink path={"/"} name={"Home"} onclick={handleShowSideBar} />
          <Navlink path={"/favourites"} name={"Favourites"} onclick={handleShowSideBar} />
          {getUserName && getUserName.length > 1 ? (
            <>
              <Navlink path={"/profile"} name={"Profile"}  onclick={handleShowSideBar} />
              <Navlink path={"/logout"} name={"Logout"}  onclick={handleShowSideBar} />
            </>
          ) : (
            <Navlink path={"/login"} name={"Login"}  onclick={handleShowSideBar} />
          )}
        </ul>
      </div>
    </nav>
  );
};
/*
className={
          showSideBar
            ? "-translate-x-full transform transition duration-1000 ease-in-out"
            : "sidebar w-3/6 fixed top-32 left-1 rounded-md lg:hidden h-screen bg-slate-700 opacity-90 font-semibold text-white transform transition duration-1000 ease-in-out  px-2"
        }*/