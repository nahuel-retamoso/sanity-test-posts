import Link from "next/link";
import Client from "./sanityClient"
import imageUrlBuilder from '@sanity/image-url'

const client = Client()
const builder = imageUrlBuilder(client)


export default function Post({title, body, image, id}) {

    const imageUrl = builder.image(image.asset._ref).url();

    return (
        <Link href={`/section/${id}`} className="flex bg-white/50 p-10 m-5 w-1/2 rounded ">
            <div className="w-4/6 mr-10">
                <h1 className="text-4xl text-black/60 mb-5">{title}</h1>
                <text>{body}</text>
            </div>
            <img src={imageUrl} alt="post image" className="w-1/2 rounded" />
        </Link>
    )
}