import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CreateEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [recipeImage, setRecipeImage] = useState(null);
  const handleChangeIngredients = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };
  const handleChangeTags = (index, e) => {
    const newTags = [...tags];
    newTags[index] = e.target.value;
    setTags(newTags);
  };
  const addNewIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  const addNewTag = () => {
    setTags([...tags, ""]);
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
      //const image_upload_url = `http://127.0.0.1:8000/api/recipe/recipes/${id}/upload-image/`;
      const recipe_data_url = "http://127.0.0.1:8000/api/recipe/recipes/";
      const formData = new FormData();
      if (recipeImage) {
        formData.append("image", recipeImage);
      }
      /*const imgResponse = await axios.post(image_upload_url, formData, {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const imageReturnedUrl = imgResponse.data.image;*/
      const response = await axios.post(
        recipe_data_url,
        {
          title,
          time_minutes: time,
          price,
          link,
          tags,
          ingredients,
          description,
          image: formData
        },
        auth
      );
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error adding recipe:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div className="pt-[10rem]">
      <form onSubmit={handleSubmit} className="create-form">
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
        <div className="adders">
          <h2>Add Ingredients</h2>
          {ingredients.map((item, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChangeIngredients(index, e)}
                placeholder={`Item ${index + 1}`}
              />
            </div>
          ))}
          <button type="button" onClick={addNewIngredient} className="addbtn">
            {" "}
            <FaPlus />{" "}
          </button>
        </div>
        <div className="adders">
          <h2>Add Tags</h2>
          {tags.map((item, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={item}
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
        <input
          type="file"
          name="upload-image"
          id="image"
          onChange={(e) => setRecipeImage(e.target.files[0])}
          accept="image/"
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
