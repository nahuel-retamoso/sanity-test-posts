import Post from "./post";
import Client from "./sanityClient";

export const revalidate = 2;

const client = Client();

async function getData() {
  const posts = await client.fetch(`*[_type == "post"]`);
  return posts;
}

export default async function Home() {

  const data = await getData()
  console.log(data[0].title)

  return (
    <main className="flex flex-col items-center justify-center bg-black/30 min-h-screen w-full overflow-scroll">
      {data.map((post, index) => {
        return (
          <Post
            key={index}
            title={post.title}
            body={post.content}
            image={post.mainImage}
          />
        );
      })}
    </main>
  )
}
