'use client'

import Item from "./Item";
import { dataContext } from "../context/DataContext";
import { useContext, useEffect } from "react";


export default function Page({ params }) {

    const {data} = useContext(dataContext)

    return (
    <div className="w-full h-[90vh] flex flex-col items-center">
        <div className="grid grid-cols-4 gap-4 w-full px-20 pt-20 overflow-auto">
            {data.map((item, index) => {
                return (
                    <Item
                        key={index}
                        title={item.title}
                        body={item.content}
                        image={item.mainImage}
                        id={item._id}
                    />
                )
            })}
        </div>
    </div>
    )
}