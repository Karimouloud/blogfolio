import Link from "next/link";
import { useState } from "react";
import { request } from "graphql-request";
import useSWR from 'swr';

const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);

export const getStaticProps = async () => {

  const data = await fetcher("https://api-eu-west-2.graphcms.com/v2/ckxk7h7nz3kft01xp0225hc5q/master",
  `{
    posts(orderBy: date_DESC) {
      title
      slug
      description
      date
      tags
      author {
        name
        image {
          url
          width
          height
        }
      }
    }
  }`);

    return {
      props: {
        posts: data.posts,
      },
    };
};


export default function BlogPage({ posts }) {

  const [searchValue, setSearchValue] = useState("");
  const { data, error } = useSWR(
    [
      "https://api-eu-west-2.graphcms.com/v2/ckxk7h7nz3kft01xp0225hc5q/master",
      `query getPosts($searchValue: String) {
        posts(orderBy: date_DESC, where: {title_contains: $searchValue}) {
          id
          title
          date
          slug
          description
          author {
            name
          }
        }
      }`,
      searchValue,
    ],    
    (endpoint, query) => fetcher(endpoint, query, { searchValue } ),
    { initialData: {posts}, revalidateOnFocus: true },
  );

  if (error) {
    return (
      <div>
        <h2>There was an error with the data fetching</h2>
      </div>
    )
  }

  return(
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0" >
      <h1 className="text-5xl text-blue-600 font-serif font-bold mb-6" >The Blog</h1>
      <div>
        <input 
          type="text" 
          value={searchValue}
          placeholder="Search Blog Posts"
          onChange={(event) => setSearchValue(event.target.value)}
          className="h-10 mb-6 focus:outline-none focus:ring-2 focus:ring-gray-900 w-full rounded-lg pl-4 text-lg text-gray-800 border border-gray-300"
        />
      </div>
        <div className='mt-20' >
          {
            posts?.map((post) => (
              <div key={post.slug} className='grid grid-cols-1 md:grid-cols-4 py-6' >
                <div className='mb-2 md:mb-0 md:col-span-1' >
                  <p className='text-gray-600 text-sm' >
                    {new Date(post.date).toDateString()}
                  </p>
                </div>
                <div className='md:col-span-3' key={post.slug}>
                  <Link href={`/blog/${post.slug}`} >
                    <a className='text-2xl font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-300' >
                      {post.title}
                    </a>                  
                  </Link>
                  <p className='text-gray-700 leading-relaxed' >{post.description}</p>
                  <div className='text-sm text-gray-900 font-semibold mt-1' >{post.author.name}</div>
                </div>
              </div>              
            ))
          }
        </div>
      </div>           
  )
}