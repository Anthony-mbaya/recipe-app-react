import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [images, setImages] = useState({});
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [getUserName, setGetUserName] = useState(false);
  //const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(false);
  const [addedItem, setAddedItem] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true); // Set authenticated if token is present
      //alert('haha');
    }
  }, []);
  const navigate = useNavigate();
  /*
  useEffect(() => {
    if(!isAuth){
      const defaultData = async () =>{
        try {
          const res = await fetch("https://dummyjson.com/recipes");
          const data = await res.json();
          if(data?.recipes){
            setRecipeList(data.recipes);
          }
          } catch (error) {
            console.error(error);
          }
      };
      defaultData();
    }
  },[!isAuth]);
  console.log(recipeList);
*/

  useEffect(() => {

    if (isAuth) {
      setLoading(true);
      const fetchRecipes = async () => {
        try {
          //const res = await fetch("https://dummyjson.com/recipes");
          const url = 'https://5fe9-105-161-86-39.ngrok-free.app/api/recipe/recipes/';
          const res = await axios.get(
            //"http://127.0.0.1:8000/api/recipe/recipes/",
            url,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = res.data;
          console.log("Fetched Recipes:", data);
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
  }, [isAuth, addedItem]);
  //console.log(recipeList);
  const fetchImage = async (id) => {
    //console.log("Fetching image for recipe ID:", id);
    if (!images[id]) {
      try {
        const url = `https://5fe9-105-161-86-39.ngrok-free.app/api/recipe/recipes/${id}/`;
        const res = await axios.get(
          //`http://127.0.0.1:8000/api/recipe/recipes/${id}/`,
          url,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = res.data;
        setImages((prevImages) => ({ ...prevImages, [id]: data.image }));
      } catch (error) {
        console.error("error");
      }
    }
  };
  useEffect(() => {
    setSearchParam("");
    if(recipeList.length > 0){
      recipeList.forEach((recipe) => {
        fetchImage(recipe.id);

      })
    }
  }, [recipeList]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      //const url = 'http://127.0.0.1:8000/api/recipe/recipes/';
      const url = `${BASE_URL}/api/recipe/recipes/`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
      //const res = await fetch(`https://dummyjson.com/recipes`);
      const data = res.data;
      //console.log(data);

      if (data) {
        const recipe_list = data;
        const filteredRecipes = recipe_list.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchParam.toLowerCase())
        );
        setRecipeList(filteredRecipes);
        setLoading(false);
        setSearchParam("");
        //navigate("/");
      }
    } catch (error) {
      //console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddToFav(currItem) {
    //create copy of current
    let copyFavList = [...favList];
    //check if it exists
    const index = copyFavList.findIndex((item) => item.id === currItem.id);
    //-1 index if its not there then push
    if (index === -1) {
      copyFavList.push(currItem);
    } else {
      copyFavList.splice(index);
    }
    setFavList(copyFavList);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        handleAddToFav,
        setRecipeList,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favList,
        getUserName,
        setGetUserName,
        setIsAuth,
        isAuth,
        fetchImage,
        images,
        ingredientsList,
        setIngredientsList,
        tagList,
        setTagList,
        setAddedItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
