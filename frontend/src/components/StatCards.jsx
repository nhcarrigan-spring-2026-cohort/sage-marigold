import React from "react";

function StatCards({ title, count }){
  return (
    <div className="bg-emerald-50 rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
      <p className="text-gray-600 text-lg font-medium mb-3">{title}</p>
      <h2 className="text-5xl font-bold text-emerald-700">{count}</h2>
    </div>
  );
};

export default StatCards;