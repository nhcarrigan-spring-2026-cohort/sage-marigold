import { LuSearch  } from "react-icons/lu";

const Search = ({search, setSearch}) => {
  return (
    <div className="w-full relative md:max-w-md border-2 border-emerald-300 rounded-3xl">
        <div className="absolute inset-y-0 left-0 flex items-center  pl-4 pointer-events-none">
            <LuSearch className= "text-[hsl(200,15%,8%)]"/>
        </div>
        
      <input
        name="search"
        type="text"
        placeholder="Search Items..."
        className="bg-white text-[hsl(200,15%,8%)] placeholder:text-[12px] w-full py-2 pl-12 outline-none rounded-3xl pr-4 shadow-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
export default Search