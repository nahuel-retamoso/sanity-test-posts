import imageUrlBuilder from '@sanity/image-url'
import Post from "./post";
import Client from "./sanityClient";

export const revalidate = 2;

const client = Client();
const builder = imageUrlBuilder(client)

async function getPost() {
  const posts = await client.fetch(`*[_type == "post"]`);
  return posts;
}

async function getHeader() {
  const header = await client.fetch(`*[_type == "header"]`);
  return header;
}

export default async function Home() {

  const data = await getPost();

  const header = await getHeader()

  const image = header[0].mainimage

  const imageUrl = builder.image(image.asset._ref).url();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full overflow-scroll">
      <div className="bg-fixed relative h-[90vh] flex items-center justify-center w-full bg-black/10 bg-contain" style={{ backgroundImage: `url(${imageUrl})` }}>
        <h1 className="absolute text-3xl font-bold text-white/80">{header[0].text}</h1>
      </div>
      <h2 className="m-10 text-2xl text-black/90">Ultimas entradas</h2>
      {data.map((post, index) => {
        return (
          <Post
            key={index}
            title={post.title}
            body={post.content}
            image={post.mainImage}
            id={post._id}
          />
        );
      })}
    </main>
  )
}
