import { useContext } from "react"
import { NavLink } from "react-router-dom" //use to create routing links
import { GlobalContext } from "../../context";

function Navlink({ path, name }) {
    return (
        <li className="list-none">
            <NavLink
                to={path}
                className='text-white hover:text-slate-500 duration-300'>
                {name}
            </NavLink>
        </li>
    )
}

export const Navbar = () => {
    const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);
    //console.log(searchParam);
    return (
        <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
            <h2 className="text-2xl font-semibold">
                <Navlink path={'/'} name={'Tonny Restaurant'} className='' />
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="search"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    placeholder="search item..."
                    className="bg-slate-700/75 p-3 px-8 rounded-full outline-none lg:w-[40rem] shadow-lg shadow-slate-600 focus:shadow-slate-400 "
                />
            </form>
            <ul className="flex gap-5">
                <Navlink path={'/'} name={'Home'} />
                <Navlink path={'/favourites'} name={'Favourites'} />
            </ul>
        </nav>
    )
}