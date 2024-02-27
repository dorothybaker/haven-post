import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";

const Write = () => {
  const BASE_URL = "https://haven-post.vercel.app/api";

  const categories = [
    { name: "Culture", value: "culture" },
    { name: "Nature", value: "nature" },
    { name: "Technology", value: "technology" },
    { name: "Lifestyle", value: "lifestyle" },
    { name: "Health", value: "health" },
    { name: "Food", value: "food" },
  ];

  const state = useLocation().state;

  const navigate = useNavigate();

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState(state?.category || "");

  const [loading, setLoading] = useState(false);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);

      const res = await axios.post(`${BASE_URL}/upload`, formData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `${BASE_URL}/posts/${state.id}`,
            {
              title,
              description: value,
              category,
              img: img ? imgUrl : "",
            },
            { withCredentials: true }
          )
        : await axios.post(
            `${BASE_URL}/posts`,
            {
              title,
              description: value,
              category,
              img: img ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-5 p-4 sm:flex-row flex-col-reverse">
      <div className="sm:flex-5 flex-col gap-3 flex">
        <input
          type="text"
          placeholder="Your post title here..."
          className="w-full p-2 border outline-none focus:outline-none font-semibold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="h-[350px] border-b">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-full overflow-hidden"
          />
        </div>
      </div>
      <div className="sm:flex-2 flex flex-col gap-3 justify-between">
        <div className="flex border flex-col p-3 flex-1 gap-1">
          <h1 className="text-[#222] font-bold">Category</h1>
          {categories.map((cat, id) => (
            <div
              className="text-[15px] text-teal-600 flex items-center gap-1 font-semibold"
              key={id}
            >
              <input
                type="radio"
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                id={cat.value}
                value={cat.value}
                className="cursor-pointer"
                checked={category === cat.value}
              />
              <label htmlFor="art">{cat.name}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 border p-3 flex-1">
          <h1 className="text-[#222] font-bold text-[17px]">Publish</h1>
          <div className="flex flex-col text-sm">
            <span>
              <b>Status: </b>Draft
            </span>
            <span>
              <b>Visibility: </b>Public
            </span>
          </div>
          <div>
            <label
              htmlFor="image"
              className={`btn btn-sm ${img ? "btn-success" : "btn-info"}`}
            >
              {img ? "Image Uploaded" : "Upload Image"}
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button className="btn text-teal-600 btn-sm">
              Save as a draft
            </button>
            <button className="btn btn-success btn-sm" onClick={handleClick}>
              {loading ? (
                <span className="loading loading-dots"></span>
              ) : state ? (
                "Update"
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
