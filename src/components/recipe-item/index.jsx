import { Link } from "react-router-dom"

export const RecipeItem = ({ item }) => {
    return (
        <div className="flex flex-col w-80 overflow-hidden p-5 bg-slate-800/75 shadow-xl gap-5 border-2 rounded-2xl border-white ">
            <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
                <img src={item?.image} alt={item?.name} className="block w-full" />
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="font-bold tetx-2xl truncate text-orange-600">
                    {item?.name}
                </h3>
                <span className="text-sm text-green-400 font-medium">
                    {item?.cuisine}
                </span>
                <Link
                    to={`/recipe-item/${item?.id}`}
                    className="text-sm p-3 px-8 rounded-lg uppercase font-medium tracking-wide inline-block shadow-md border-2 border-white text-white hover:bg-slate-700 "
                >
                    View Recipe
                </Link>
            </div>
        </div>
    )
}