import ItemCard from "./ItemCard";

const ItemList = () => {
  return (
     <div className="grid space-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <ItemCard
          category="Furniture"
          title="Sofa"
          description="Upgraded my living room and want these to go to someone..."
          condition="good"
          location="Manhattan, NY"
          date_posted="01/02/2026"
          image="/sofa_placeholder.jpg"
          // onRequest={() => console.log("Requested")}
        />
        <ItemCard
          category="Appliances"
          title="Toaster"
          description="Upgraded my kitchen and want these to go to someone..."
          condition="good"
          location="Manhattan, NY"
          date_posted="01/02/2026"
          image= "/toaster_placeholder.jpg"
          // onRequest={() => console.log("Requested")}
        />
        <ItemCard
          category="Furniture"
          title="Sofa"
          description="Upgraded my living room and want these to go to someone..."
          condition="good"
          location="Manhattan, NY"
          date_posted="01/02/2026"
          image="/sofa_placeholder.jpg"
          // onRequest={() => console.log("Requested")}
        />
        <ItemCard
          category="Appliances"
          title="Toaster"
          description="Upgraded my kitchen and want these to go to someone..."
          condition="good"
          location="Manhattan, NY"
          date_posted="01/02/2026"
          image="/toaster_placeholder.jpg"
          // onRequest={() => console.log("Requested")}
        />
      </div>
  )
}
export default ItemList