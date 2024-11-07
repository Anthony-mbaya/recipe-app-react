import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useContext } from "react";

export const RecipeItem = ({ item }) => {
  const { isAuth, fetchImage, images } = useContext(GlobalContext);
  const navigate = useNavigate();


  return (
    <div className="flex flex-col w-80 overflow-hidden p-4 bg-slate-800/75 shadow-xl gap-2 border-2 rounded-2xl border-white ">
      <div key={item.id} className="h-40 flex justify-center overflow-hidden items-center rounded-xl hover:scale-105 duration-300">
        <img
        src={images[item.id]}
        alt={item?.title}
        //onClick={() => fetchImage(item.id)}
        className=" w-full object-cover object-center" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="font-bold text-xl capitalize truncate text-orange-600">
          {item?.title}
        </h3>
        <span className="text-sm text-white font-medium">
          $ {item?.price}
        </span>
        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            {
              !token
                ? navigate("/login")
                : navigate(`/recipe-item/${item?.id}`);
            }
          }}
          className="text-sm py-2 px-8 rounded-lg uppercase font-medium tracking-wide inline-block shadow-md border-b-0 border-t-0 border-2 border-white text-white bg-slate-700 duration-300 hover:bg-slate-900 "
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};
