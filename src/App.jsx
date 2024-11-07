import { Routes, Route } from "react-router-dom";
import { Details } from "./pages/details";
import { Home } from "./pages/home";
import { Favourites } from "./pages/favourites";
import { Navbar } from "./components/navbar";
import { Verification } from "./pages/auth";
import { Logout } from "./pages/auth/logout";
import { Profile } from "./pages/profile";
import { EditProfile } from "./pages/profile/edit-profile";
import { CreateEdit } from "./pages/create-edit";
import { GlobalContext } from "./context";
import './index.css';
import { useContext, useEffect } from "react";
export const App = () => {
  const { setIsAuth } = useContext(GlobalContext);

  useEffect(() => {
    // Check for the token in localStorage when the app loads
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuth(true); // Set user as authenticated if token exists
    } else {
      setIsAuth(false); // Set user as not authenticated if token is missing
    }
  }, [setIsAuth]);
  return (
    <div>
      <div className="w-screen min-h-screen p-6 bg-[#0f172a] text-white text-lg">
        <Navbar /> {/* appear globally in all pages */}
        {/*routes will manage routing*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Verification />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<EditProfile />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/create-edit" element={<CreateEdit />} />
          <Route
            path="/recipe-item/:id" //id can be dynamic
            element={<Details />}
          />
        </Routes>
      </div>
    </div>
  );
};
