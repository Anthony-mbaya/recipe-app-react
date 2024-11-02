import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context"
import { RecipeItem } from "../../components/recipe-item";
import 'ldrs/ring';

export const Home =()=> {
    const { recipeList, loading } = useContext(GlobalContext);
    if(loading){
        //ring loader from ldrs
        return <div className="pt-[10rem] flex items-center justify-center"><l-ring size='40' color='coral'></l-ring></div>;
    }
    return(
        <div className="pt-[10rem] py-8 container mx-auto flex flex-wrap justify-center gap-10 ">
            {/* 5render the list 0of recipes */}
            <div className="w-fit h-fit fixed top-[10rem] right-4 bg-green-600 text-white px-2 py-1 rounded-lg ">
                <Link to="/create-edit">Create Recipe</Link>
                </div>
            {
                recipeList && recipeList.length > 0 ?
                <div className="flex flex-wrap gap-10 mx-auto justify-center">
                    {
                        recipeList.map((item, index) => <RecipeItem item={item} key={index} />)
                    }
                </div> : <div>
                    <h1 className="lg:text-4xl text-green-600 font-extrabold text-center">No Recipes Found</h1>
                </div>
            }
        </div>
    )
}