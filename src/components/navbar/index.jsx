import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; //use to create routing links
import { GlobalContext } from "../../context";
import { AiFillCloseSquare, AiOutlineMenu } from "react-icons/ai";

//
function Navlink({ path, name, onclick }) {
  return (
    <li className="list-none w-fit">
      <NavLink
        to={path}
        className="text-white flex justify-center items-center hover:text-slate-500 duration-300 px-2 sm:px-2 py-2"
        onClick={onclick}
      >
        {name}
      </NavLink>
    </li>
  );
}

export const Navbar = () => {
  const {
    searchParam,
    setSearchParam,
    handleSubmit,
    setGetUserName,
    getUserName,
    isAuth,
  } = useContext(GlobalContext);
  const [showSideBar, setShowSideBar] = useState(true);
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setGetUserName(user);
    } else {
      setGetUserName(null);
    }
  }, []);

  //console.log(searchParam);
  return (
    <>
      <p
        className={`${
          isAuth ? "block" : "hidden"
        } fixed z-50 top-0 left-0 px-2 text-white text-sm text-center duration-300 font-extralight bg-slate-900 bg-opacity-80`}
      >
        Hello,{" "}
        <span className="text-green-600 font-bold text-lg">
          {isAuth && getUserName ? getUserName : "Guest"}
        </span>{" "}
        welcome back!
      </p>
      <nav className="fixed z-50 w-screen top-7 left-0 right-0 flex justify-between items-center sm:py-1 container mx-auto flex-col gap-0 sm:gap-1 md:flex-row lg:gap-0 bg-slate-900 bg-opacity-80">
        <h2
          className={`${
            isAuth ? "w-fit" : "w-full"
          } md:px-0 sm:px-1 md:text-3xl text-2xl font-semibold text-center`}
        >
          <Navlink path={"/"} name={"Online Restoo"} />
        </h2>
        <form
          onSubmit={handleSubmit}
          className="sm:mx-auto sm:flex flex-col-reverse gap-1 justify-center sm:w-fit items-center"
        >
          <input
            type="text"
            name="search"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="search item..."
            className={`${
              isAuth ? "block" : "hidden"
            } bg-slate-600/100 border text-sm text-center rounded-full outline-none mx-auto w-[20rem] sm:w-[32rem] md:w-[17rem] py-2 lg:w-[40rem] shadow-lg shadow-slate-800 focus:shadow-slate-700`}
          />
        </form>
        <ul className="sm:w-fit sm:flex gap-2 sm:gap-2 hidden sm:px-2 text-sm mx-auto justify-end items-center">
          <Navlink path={"/"} name={"Home"} />

          {isAuth ? (
            <>
            <Navlink path={"/favourites"} name={"Favourites"} />
              <Navlink path={"/profile"} name={"Profile"} />
              <Navlink path={"/logout"} name={"Logout"} />
            </>
          ) : (
            <Navlink path={"/login"} name={"SignIn/SignUp?"} />
          )}
        </ul>

        <button
          onClick={handleShowSideBar}
          className={`${
            isAuth ? "top-[8.7rem]" : "top-[5rem]"
          } fixed right-9 sm:hidden`}
        >
          {showSideBar && (
            <AiOutlineMenu
              className="bg-white text-slate-900 p-1 rounded-md"
              size={32}
            />
          )}
        </button>
        <div
          className={`sidebar w-3/6 fixed top-32 left-1 rounded-md lg:hidden h-[75%] bg-slate-700 opacity-90 font-semibold text-white transform transition duration-1000 ease-in-out  px-2
        ${showSideBar ? "-translate-x-full" : "translate-x-0"}`}
        >
          <button onClick={handleShowSideBar} className="fixed top-3 right-3">
            {!showSideBar && (
              <AiFillCloseSquare
                className="text-slate-800 bg-white"
                size={30}
              />
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

            {isAuth ? (
              <>
                <Navlink
                  path={"/create-edit"}
                  name={"Create"}
                  onclick={handleShowSideBar}
                />
                <Navlink
                  path={"/favourites"}
                  name={"Favourites"}
                  onclick={handleShowSideBar}
                />

                <Navlink
                  path={"/profile"}
                  name={"Profile"}
                  onclick={handleShowSideBar}
                />
                <Navlink
                  path={"/logout"}
                  name={"Logout"}
                  onclick={handleShowSideBar}
                />
              </>
            ) : (
              <Navlink
                path={"/login"}
                name={"Login"}
                onclick={handleShowSideBar}
              />
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
/*
className={
          showSideBar
            ? "-translate-x-full transform transition duration-1000 ease-in-out"
            : "sidebar w-3/6 fixed top-32 left-1 rounded-md lg:hidden h-screen bg-slate-700 opacity-90 font-semibold text-white transform transition duration-1000 ease-in-out  px-2"
        }*/
