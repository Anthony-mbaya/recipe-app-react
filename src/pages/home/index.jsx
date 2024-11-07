import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context";
import { RecipeItem } from "../../components/recipe-item";
import "ldrs/ring";

export const Home = () => {
  const { isAuth, setIsAuth } = useContext(GlobalContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true); // Set authenticated if token is present

    } else {
      setIsAuth(false);
    }
  }, []);

  // Render AuthUserDisplay if authenticated; otherwise, render UnAuthUserDisplay
  return isAuth ? <AuthUserDisplay /> : <UnAuthUserDisplay />;
};
function AuthUserDisplay() {
  const { recipeList, loading } = useContext(GlobalContext);
  if (loading) {
    //ring loader from ldrs
    return (
      <div className="pt-[10rem] flex items-center justify-center">
        <l-ring size="40" color="coral"></l-ring>
      </div>
    );
  }
  return (
    <div className="pt-[4rem] sm:pt-[7rem] md:pt-[6rem] lg:pt-[5rem] py-8 container mx-auto flex flex-wrap justify-center gap-10 ">
      {/* 5render the list 0of recipes */}
      <Link to="/create-edit">
        {" "}
        <div className="w-fit h-fit fixed hidden sm:block top-[10rem] right-4 cursor-pointer bg-white hover:bg-slate-700 hover:scale-105 duration-300 bg-opacity-95 text-green-500 font-semibold px-2 py-3 rounded-lg ">
          Create Recipe
        </div>
      </Link>
      {recipeList && recipeList.length > 0 ? (
        <div className="flex flex-wrap gap-10 mx-auto justify-center">
          {recipeList.map((item, index) => (
            <RecipeItem item={item} key={index} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="lg:text-4xl text-green-600 font-extrabold text-center">
            No Recipes Found
          </h1>
        </div>
      )}
    </div>
  );
}

function UnAuthUserDisplay() {
  return (
    <div className="pt-[4.6rem] py-8 container flex flex-col mx-auto gap-10 ">
      <header className="text-white py-6 text-center">
        <h1 className="text-3xl font-bold pb-2">Welcme to Online Recipe App</h1>
        <p className="text-sm">
          Woo hoo.. a cool platform for creating, saving, and sharing delicious
          recipes!
        </p>

      </header>
<div className="container w-full text-end">
  <span className="border-2 border-green-500 text-white text-2xl font-bold px-10 py-3 rounded-full">9,000+ Users</span>
  </div>
      <section className="mt-3 text-center px-4">
        <h2 className="text-2xl font-semibold">Why Online Recipe App?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="relative flex justify-center items-center flex-col sm:h-[16rem] p-4 border bg-home-img1 hover:scale-95 duration-300 bg-cover bg-center rounded-lg shadow-lg shadow-slate-600">
            <div className="absolute bg-black inset-0 bg-opacity-50"></div>
            <h3 className="relative z-10 text-white font-semibold text-lg   ">
              Create Your Own Recipes
            </h3>
            <p className="relative z-10 text-white">
              Design and share your culinary creations with the world!
            </p>
          </div>
          <div className="relative flex justify-center items-center flex-col sm:h-[16rem] p-4 border bg-home-img2 hover:scale-95 duration-300 bg-cover bg-center rounded-lg shadow-lg shadow-slate-600">
            <div className="absolute bg-black inset-0 bg-opacity-50"></div>
            <h3 className="relative z-10 text-white font-semibold text-lg   ">
              Save Your Favorite Recipes
            </h3>
            <p className="relative z-10 text-white">
              Bookmark recipes you love for easy access
            </p>
          </div>
          <div className="relative flex justify-center items-center flex-col sm:h-[16rem] p-4 border bg-home-img3 hover:scale-95 duration-300 bg-cover bg-center rounded-lg shadow-lg shadow-slate-600">
            <div className="absolute bg-black inset-0 bg-opacity-50"></div>
            <h3 className="relative z-10 text-white font-semibold text-lg   ">
              Edit and Update Recipes
            </h3>
            <p className="relative z-10 text-white">
              Refine and improve your recipes anytime you like
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <p className="text-lg mb-4">
          Sign up and check the services we offer!
        </p>
        <Link to="/login">
          <button className="bg-white text-green-600  py-2 px-6 rounded-md hover:bg-transparent hover:border-2">
            Create Account
          </button>
        </Link>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            log in
          </Link>

        </p>
      </section>
       <div class="mt-8 text-center">
    <p class="text-lg text-gray-600 mb-4">
      Join us to access exclusive features, save your favorite recipes, and share your culinary creations with a growing community.
    </p>
    <Link to='/login'>
    <button class="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300">
      Sign Up & Start Cooking
    </button>
    </Link>
  </div>
    </div>
  );
}
