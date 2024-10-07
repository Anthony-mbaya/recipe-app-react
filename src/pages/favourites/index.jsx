import { useContext } from "react";
import { GlobalContext } from "../../context";
import { RecipeItem } from "../../components/recipe-item";
import { FaPlusSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import 'ldrs/ring';

export const Favourites = () => {
  const { favList, loading } = useContext(GlobalContext);
  if (loading) {
    return <div className="flex items-center justify-center"><l-ring size='40' color='coral'></l-ring></div>;
  }
  return (
    <div className="pt-[10rem] py-8 container mx-auto flex flex-wrap justify-center gap-10 ">
      {/* 5render the list 0of recipes */}
      {favList && favList.length > 0 ? (
        <div className="flex flex-wrap gap-10 mx-auto justify-center">
          {favList.map((item, index) => (
            <RecipeItem item={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-center">
          <h1 className="lg:text-xl text-green-600 font-bold text-center">
            No favourites Found
          </h1>
          <button>
            <NavLink to={"/"}>
              <FaPlusSquare className="text-4xl text-orange-600" />
            </NavLink>
          </button>
        </div>
      )}
    </div>
  );
};
