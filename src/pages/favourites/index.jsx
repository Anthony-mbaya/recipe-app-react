import { useContext } from "react"
import { GlobalContext } from "../../context"
import { RecipeItem } from "../../components/recipe-item";

export const Favourites =()=> {
    const { favList, loading } = useContext(GlobalContext);
    if(loading){
        return <div>Loading...wait please!</div>;
    }
    return(
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 ">
            {/* 5render the list 0of recipes */}
            {
                favList && favList.length > 0 ?
                <div className="flex flex-wrap gap-10 mx-auto justify-center">
                    {
                        favList.map((item, index) => <RecipeItem item={item} key={index} />)
                    }
                </div> : <div>
                    <h1 className="lg:text-4xl text-green-600 font-extrabold text-center">No favourites Found</h1>
                </div>
            }
        </div>
    )
}