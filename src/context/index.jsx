import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favList, setFavList] = useState([]);
  const [getUserName, setGetUserName] = useState(false);
  //const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    if (isAuth){
      const fetchRecipes = async () => {
        try {
          //const res = await fetch("https://dummyjson.com/recipes");
          const res = await axios.get("http://127.0.0.1:8000/api/recipe/recipes/",{
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`,
            }
          });
          const data = res.data;
          console.log('Fetched Recipes:', data);
          if (data) {
            setRecipeList(data);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipes:", error);
          setLoading(false);
        }
      };
    fetchRecipes();
    }
  }, [isAuth]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/recipes`);
      const data = await res.json();
      //console.log(data);

      if (data?.recipes) {
        const recipe_list = data.recipes;
        const filteredRecipes = recipe_list.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchParam.toLowerCase())
        );
        setRecipeList(filteredRecipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (error) {
      //console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddToFav(currItem) {
    //console.log(currItem);
    let copyFavList = [...favList];
    const index = copyFavList.findIndex((item) => item.id === currItem.id);
    if (index === -1) {
      copyFavList.push(currItem);
    } else {
      copyFavList.splice(index);
    }
    setFavList(copyFavList);
  }

  //console.log(favList);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        handleAddToFav,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favList,
        getUserName,
        setGetUserName,
        setIsAuth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
