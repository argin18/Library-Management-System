import React from 'react'


const Card = ({ title, value, color }) => {
  return (
    <>
         <div className="bg-white p-5 rounded-lg shadow">
    <h4 className="text-gray-600 font-medium">{title}</h4>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
    </>
  )
}

export default Card