import Head from "next/head";
import Header from "@/components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "@/typings";
import Link from "next/link";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Clone</title>
        <link rel='stylesheet' href='/favicon.ico' />
      </Head>
      <Header />

      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>
              Medium
            </span>{" "}
            is a place to read, write, and connect.
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>
        <img
          className='hidden md:inline-flex h-32 lg:h-full'
          src='./images/Medium-logo.png'
          alt='/'
        />
      </div>

      {/* posts */}
      <div>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <h1>i am a post</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
  _id,
    title,
    author -> {
      name, 
        image
    },
    description,
    mainImage,
    slug
}`;

  const posts = await sanityClient.fetch(query);
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
};
