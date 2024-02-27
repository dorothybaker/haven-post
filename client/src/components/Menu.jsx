import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuSkeleton } from "../skeletons/menuSkeleton";

const Menu = ({ category }) => {
  const BASE_URL = "https://haven-post.vercel.app/api";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/posts/?category=${category}`);
        if (res) {
          setPosts(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <MenuSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-[#333]">Editor's Pick</span>
        <span className="text-sm text-gray-500 font-semibold">
          Posts you may like!
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {posts &&
          posts.slice(0, 3)?.map((post) => (
            <div key={post.id} className="flex flex-col gap-1">
              <img
                src={`../uploads/${post.img}`}
                alt="postImage"
                className="h-[200px] w-full object-cover"
              />
              <h2 className="font-extrabold">{post.title}</h2>
              <button className="btn text-teal-600 btn-sm">
                <Link to={`/post/${post.id}`} className="w-full">
                  Read More
                </Link>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
