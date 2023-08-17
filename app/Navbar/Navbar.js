'use client'

import Link from "next/link"
import Client from "../sanityClient"
import { dataContext } from "../context/DataContext";
import { useContext, useEffect } from "react";

const client = Client();

export default  function Navbar () {

    const { sections, getSections, getData } = useContext(dataContext);

    useEffect(() => {
        getSections();
    }, [])

    return (
        <div className="text-white/90 font-bold h-[10vh] w-full flex items-center justify-center bg-emerald-600">
            <Link href='/' className="w-1/6 h-full text-2xl items-center justify-around flex">home</Link>
            <div className="flex h-full w-5/6 items-center justify-around">
                {sections.map((section, index) => {

                    return (
                        <div key={index} style={{ backgroundColor: section.color.hex}} className={'h-full flex items-center justify-center px-5'}>
                            <Link onClick={() => getData(section._id)} href={`/${section.slug.current}`}>{section.name}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}