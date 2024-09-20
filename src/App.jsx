import { Routes, Route } from "react-router-dom";
import { Details } from "./pages/details";
import { Home } from "./pages/home";
import { Favourites } from "./pages/favourites";
import { Navbar } from "./components/navbar";

export const App = () => {
  return (
    <div>
      <div className="min-h-screen p-6 bg-[#0f172a] text-white text-lg">
        <Navbar /> {/* appear globally in all pages */}
        { /*routes will manage routing*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="/recipe-item/:id" //id can be dynamic
            element={<Details />} />
        </Routes>
      </div>
    </div>
  )
}