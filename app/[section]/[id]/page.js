'use client'

import { dataContext } from "@/app/context/DataContext"
import { useEffect, useState } from "react"
import { useContext } from "react"
import imageUrlBuilder from '@sanity/image-url'
import Client from '../../sanityClient'

const client = Client()
const builder = imageUrlBuilder(client)


export default function Page({ params }) {


    const { fetchById, post } = useContext(dataContext)
    const [image, setImage] = useState(null)


    useEffect(() => {
        fetchById(params.id);
    }, [params.id]);


    useEffect(() => {
        if (post && post[0] && post[0].mainImage) {
            const imageUrl = builder.image(post[0].mainImage.asset._ref).url();
            setImage(imageUrl);
        }
    }, [post]);

    return (
        <div className="w-full h-min-[80vh] flex items-center justify-center flex items-center justify-center">
            <div className="flex flex-col items-center w-2/3 bg-black/10">
                <div className="w-full bg-white/50">
                    <img src={image} alt="img" className="w-full" />
                </div>
                <p className="text-2xl font-semibold mt-20">{post[0]?.title}</p>
                <p className="p-20">{post[0]?.content}</p>
            </div>
        </div>
    )
}