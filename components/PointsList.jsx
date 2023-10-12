import React from 'react'

export const PointsList = ({ item }) => {
    return (
        <tr className='bg-white rounded-md mt-4 text-blue-500 p-2'>
            <td className="p-2 font-bold text-blue-950">
                {item.TeamName} </td>
            <td className="text-right text-blue-800 font-bold p-2">{item.Matches}</td>
            <td className="text-right p-2">{item.Won}</td>
            <td className="text-right p-2">{item.Lost}</td>
            <td className=" p-4">{item.NR}</td>
            <td className=" p-4">{item.Pts}</td>
            <td className=" p-4">{item.NRR}</td>
        </tr>
    )
}
