import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import DOMPurify from "dompurify";

import { AuthContext } from "../../context/authContext";

const Single = () => {
  const BASE_URL = "https://haven-post.vercel.app/api";
  const [post, setPost] = useState([]);

  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/posts/${postId}`);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts/${postId}`);
        if (res) {
          setPost(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <div className="flex gap-5 p-4">
      <div className="md:flex-5 flex gap-4 flex-col">
        <div className="sm:h-[350px] h-[280px]">
          <img
            src={`../uploads/${post.img}`}
            alt="postImage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2 items-center">
            {post?.profileImg && (
              <img
                src={post?.profileImg}
                alt="profilePicture"
                width={50}
                height={50}
                className="object-cover"
              />
            )}
            <div className="text-sm flex flex-col justify-between">
              <span className="font-semibold">{post?.username}</span>
              <span className="text-gray-500">
                Posted {moment(post?.date).fromNow()}
              </span>
            </div>
          </div>

          {currentUser?.username === post?.username && (
            <div className="flex gap-2">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <div className="w-max p-2 bg-success text-white rounded-full">
                  <MdOutlineEdit size={20} />
                </div>
              </Link>
              <div
                className="w-max p-2 bg-error text-white rounded-full cursor-pointer"
                onClick={handleDelete}
              >
                <MdOutlineDelete size={20} />
              </div>
            </div>
          )}
        </div>
        <h1 className="lg:text-4xl text-3xl font-bold">{post.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.description),
          }}
          className="single"
        />
      </div>
      <div className="md:flex-2 md:block hidden">
        <Menu category={post?.category} />
      </div>
    </div>
  );
};

export default Single;
