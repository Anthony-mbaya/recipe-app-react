import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useContext } from "react";

export const RecipeItem = ({ item }) => {
  const { isAuth, fetchImage, images } = useContext(GlobalContext);
  const navigate = useNavigate();


  return (
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-slate-800/75 shadow-xl gap-5 border-2 rounded-2xl border-white ">
      <div key={item.id} className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img
        src={images[item.id]}
        alt={item?.title}
        //onClick={() => fetchImage(item.id)}
        className="block w-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <h3 className="font-bold tetx-2xl truncate text-orange-600">
          {item?.title}
        </h3>
        <span className="text-sm text-green-400 font-medium">
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
          className="text-sm p-3 px-8 rounded-lg uppercase font-medium tracking-wide inline-block shadow-md border-2 border-white text-white hover:bg-slate-700 "
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};
