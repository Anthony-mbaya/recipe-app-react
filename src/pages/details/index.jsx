import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import axios from "axios";
import "ldrs/ring";

export const Details = () => {
  //used to retrieve the dynamic parameters from the current route
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFav,
    favList,
    loading,
    ingredientsList,
    setIngredientsList,
    tagList,
    setTagList,
  } = useContext(GlobalContext);
  if (loading) {
    <div className="flex items-center justify-center">
      <l-ring size="40" color="coral"></l-ring>
    </div>;
  }
  useEffect(() => {
    async function getRecipeDetails() {
      //const res = await fetch(`https://dummyjson.com/recipes/${id}`);
      const res = await axios.get(
        `http://127.0.0.1:8000/api/recipe/recipes/${id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      //console.log(data);
      if (data) {
        setRecipeDetailsData(data);
        //console.log(data.data);
      }
    }
    getRecipeDetails();
  }, []);
  //console.log(recipeList);
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/recipe/recipes/?ingredients=${id}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = res.data[0].ingredients;
        if (data.length > 0) {
          setIngredientsList(data);
        }
      } catch (error) {
        console.error("error");
        setIngredientsList("");
      }
    };
    getIngredients();
  }, []);
  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/recipe/recipes/?tags=${id}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = res.data[0].tags;
        if (data.length > 0) {
          setTagList(data);
        }
      } catch (error) {
        console.error("error");
        setTagList("");
      }
    };
    getTags();
  }, []);
  console.log(tagList);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 pt-[10rem]">
      <div className="row-start-2 lg:row-start-auto">
        <img
          src={recipeDetailsData?.image}
          alt={recipeDetailsData?.title}
          className="w-full h-full object-cover block hover:scale-105 duration-300"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold tetx-2xl truncate text-orange-600">
          {recipeDetailsData?.title}
        </h3>
        <span className="text-sm text-green-400 font-medium">
          {recipeDetailsData?.link}
        </span>
        <span className="text-sm text-green-400 font-medium">
          $ {recipeDetailsData?.price}
        </span>
        <span className="text-sm text-green-400 font-medium">
          {recipeDetailsData?.time_minutes} minutes
        </span>
        <div>
          <button
            onClick={() => handleAddToFav(recipeDetailsData)}
            className="p-3 px-8 rounded-lg text-sm font-medium tracking-wider mt-3 inline-block shadow-md bg-slate-950 text-white hover:bg-slate-800"
          >
            {favList.findIndex((item) => item.id === recipeDetailsData.id) !==
            -1 ? (
              <span className="text-sm flex flex-row gap-2 text-gray-400 font-medium">
                {" "}
                <FaCheckCircle className="text-2xl text-green-400" /> Renove
                from Favourites
              </span>
            ) : (
              <span className="text-sm flex flex-row gap-2 text-gray-400 font-medium">
                {" "}
                <FaHeart className="text-2xl text-red-500" /> Add to Favourites
              </span>
            )}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-white">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {ingredientsList.length > 0 ? (
              ingredientsList.map((ingredient, index) => {
                return (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-sm flex flex-row gap-2 text-gray-400 font-medium px-3 mt-4">
                      {" "}
                      <FaCheckCircle /> {ingredient.name}
                    </span>
                  </li>
                );
              })
            ) : (
              <p>no ingredients</p>
            )}
          </ul>
        </div>
        <div>
          <span className="text-2xl font-semibold text-white">Tags:</span>
          <ul className="flex flex-col gap-3">
            {tagList.length > 0 ? (
              tagList.map((tag, index) => {
                return (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-sm flex flex-row gap-2 text-gray-400 font-medium px-3 mt-4">
                      {" "}
                      <FaCheckCircle /> {tag.name}
                    </span>
                  </li>
                );
              })
            ) : (
              <p>no tags</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
