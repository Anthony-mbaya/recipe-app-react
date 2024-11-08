import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
//import { useParams } from "react-router-dom";

export const CreateEdit = () => {
  //const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "" }]);
  const [tags, setTags] = useState([{ name: "" }]);
  const [recipeImage, setRecipeImage] = useState(null);
  const { setAddedItem } = useContext(GlobalContext);
  //console.log(id);
  const navigate = useNavigate();
  const handleChangeIngredients = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = e.target.value;
    setIngredients(newIngredients);
  };
  //console.log(ingredients);

  const handleChangeTags = (index, e) => {
    const newTags = [...tags];
    newTags[index].name = e.target.value;
    setTags(newTags);
  };
  const addNewIngredient = () => {
    setIngredients([...ingredients, { name: "" }]);
  };
  const addNewTag = () => {
    setTags([...tags, { name: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };

      const recipe_data_url = "http://127.0.0.1:8000/api/recipe/recipes/";

      //const imageReturnedUrl = imgResponse.data.image;
      const response = await axios.post(
        recipe_data_url,
        {
          title,
          time_minutes: time,
          price,
          link,
          tags: tags.map((tag, index) => ({ id: index, name: tag.name })),
          ingredients: ingredients.map((ingredient, index) => ({
            id: index,
            name: ingredient.name,
          })),
          description,
        },
        auth
      );
      //console.log(response.data);
      const currRecipeId = response.data.id;
      const formData = new FormData();
      if (currRecipeId && recipeImage) {
        formData.append("image", recipeImage);
      }
      const image_upload_url = `http://127.0.0.1:8000/api/recipe/recipes/${currRecipeId}/upload-image/`;
      const imgResponse = await axios.post(image_upload_url, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      console.log(imgResponse.data);
      setAddedItem(true);
      navigate('/');
    } catch (error) {
      console.error(
        "Error adding recipe:",
        error.response ? error.response.data : error.message
      );
      setAddedItem(false);
    }
  };
  return (
    <div className="mt-[6rem] sm:mt-[9rem] w-full py-2 text-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-0">
          <div className="create-form">
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Recipe Nmae"
              required
            />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="2"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="My recipe ..."
              required
            ></textarea>
            <input
              type="number"
              name="time"
              id="time"
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time in minutes"
              required
              max={60}
              min={5}
            />
            <input
              type="text"
              name="price"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price in usd"
              required
            />
            <input
              type="text"
              name="link"
              id="link"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link"
            />
          </div>
          <div className="create-form">
            <div className="adders">
              <h2>Add Ingredients</h2>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="input-grou">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleChangeIngredients(index, e)}
                    placeholder={`Item ${index + 1}`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addNewIngredient}
                className="addbtn"
              >
                {" "}
                <FaPlus />{" "}
              </button>
            </div>
            <div className="adders">
              <h2>Add Tags</h2>
              {tags.map((tag, index) => (
                <div key={index} className="input-grou">
                  <input
                    type="text"
                    value={tag.name}
                    onChange={(e) => handleChangeTags(index, e)}
                    placeholder={`Item ${index + 1}`}
                  />
                </div>
              ))}
              <button type="button" onClick={addNewTag} className="addbtn">
                {" "}
                <FaPlus />{" "}
              </button>
            </div>

            <label
              htmlFor="image"
              className="flex flex-col items-center p-4 bg-blue-400 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out"
            >
              <span className="mt-2 text-base leading-normal">
                Upload Image
              </span>
              <input
                type="file"
                name="upload-image"
                id="image"
                onChange={(e) => setRecipeImage(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="submit"
          className="w-1/2 sm:w-1/4 mx-auto py-2 cursor-pointer rounded-md bg-green-800"
        />
      </form>
    </div>
  );
};