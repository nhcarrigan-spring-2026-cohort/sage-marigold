import ItemList from "../components/ItemList"

const Explore = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold text-center mt-8">Find What you Need</h1>
        <p className="text-center text-gray-600">Browse through our collection of items available for donation and support.</p>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ItemList/>
        </div>
    </div>
  )
}
export default Explore