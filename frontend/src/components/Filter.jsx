import Search from "./Search";
import { FaFilter,FaBoxOpen } from "react-icons/fa";
import { FaLocationDot,FaChevronDown  } from "react-icons/fa6";

const Filter = ({ search, setSearch }) => {
  return (
    <div className="my-5">
      <Search search={search} setSearch={setSearch} />
      <div className="flex gap-5">
        <button className="flex items-center gap-2" type="button">
            <FaFilter className="text-emerald-500" />
            Category
            <FaChevronDown className="text-emerald-500" />
        </button>
        <button className="flex items-center justify-between " type="button">
            <FaBoxOpen className="text-emerald-500" />
            Condition
            <FaChevronDown className="text-emerald-500" />
        </button>
        <button className="flex items-center gap-2 border text-sm p-3" type="button">
            <FaLocationDot className="text-emerald-500" />
            Location
            <FaChevronDown className="text-emerald-500" />
        </button>
      </div>
      <div>
        <span>Active Filters:</span>
        <button>Clear All</button>
      </div>
    </div>
  );
};
export default Filter;
