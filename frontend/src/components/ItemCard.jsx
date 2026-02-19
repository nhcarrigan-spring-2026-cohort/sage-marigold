import { FaBoxOpen, FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ItemCard = ({
  title,
  description,
  condition,
  location,
  created_at,
  images,
  category,
  onRequest,
}) => {

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return (
    <div className="bg-white h-full border relative border-gray-200 rounded-xl overflow-hidden gap-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center h-48">
        <img
          src={images[0]}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
        <span className="bg-emerald-50 border border-emerald-200 text-black font-medium text-xs py-0.5 px-2 w-fit rounded-md overflow-hidden gap-1 justify-center items-center shrink-0 inline-flex left-3 top-3 absolute">
          {category}
        </span>
      </div>

      <div className="pb-6 p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-22">
          {description}
        </p>


        <div className="space-y-2 ">
          {" "}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBoxOpen />
            <span>
              Condition:
              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                {condition}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaLocationDot />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaCalendar />
            <span>{formatDate(created_at)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center [.border-t]:pt-6 p-4 pt-0">
        <button
          onClick={onRequest}
          className="outline-none inline-flex justify-center items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 py-2 px-4 h-9 w-full bg-emerald-700 text-white hover:bg-emerald-800"
          type="button"
        >
          Request This Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
