import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url'
import Client from "../sanityClient";

const client = Client()
const builder = imageUrlBuilder(client)

export default function Item ({title, image, body, id}) {

    const imageUrl = builder.image(image.asset._ref).url();


    return (
        <Link href={`item/${id}`} className="h-64 w-full flex flex-col items-center justify-center bg-blue-200 overflow-hidden pb-4">
            <div className="h-2/3 w-full bg-black/30 overflow-hidden">
                <img src={imageUrl} alt="post image" className="rounded w-full" />
            </div>
            <p className="text-md font-semibold">{title}</p>
            <p className="h-1/3 px-7 text-sm text-center overflow-hidden">{body}</p>
        </Link>
    )
}