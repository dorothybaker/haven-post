import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import DOMPurify from "dompurify";

const Home = () => {
  const BASE_URL = "http://localhost:8000/api";
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts/${category}`);
        if (res) {
          setPosts(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5 sm:gap-16">
        {posts.map((post) => (
          <div key={post.id} className="flex gap-7 odd:flex-row-reverse">
            <div className="flex-1 hidden sm:block relative after:w-full after:h-full after:bg-[#b9e7e7] after:absolute after:top-5 after:-left-5 after:-z-10">
              <img
                src={`../uploads/${post.img}`}
                alt=""
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className="md:flex-2 sm:flex-1 flex flex-col justify-between gap-2 w-full">
              <Link to={`/post/${post.id}`}>
                <h1 className="lg:text-5xl font-bold md:text-4xl sm:text-3xl text-2xl">
                  {post.title}
                </h1>
              </Link>
              <p className="text-gray-600 line-clamp-4">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post?.description),
                  }}
                  className="single"
                />
              </p>
              <Link to={`/post/${post.id}`}>
                <button className="btn text-teal-600">Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
