export default function Search({
  search,
  e,
  setSearch
}) {
  return <div className="hidden md:flex flex-1 mx-8 gap-2">
        <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} className="w-full max-w-2xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        <button className="bg-black text-white px-6 py-2 text-sm font-semibold hover:bg-gray-800">
          Search
        </button>
      </div>;
}
  