import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const BASE_URL = "https://haven-post.vercel.app/api";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await login(username, password);

      if (res) {
        toast.success("Logged in successfully!");
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#b9e7e7] flex flex-col justify-center items-center h-screen">
      <div className="shadow-md bg-white max-w-[500px] w-full p-4 rounded-md">
        <h1 className="text-2xl font-bold text-teal-600">HavenPost</h1>
        <div className="flex flex-col text-sm font-semibold text-gray-600">
          <p>Log in to your account</p>
        </div>

        <form
          className="mt-3 flex flex-col gap-3 mb-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label htmlFor="username" className="font-extrabold">
              Username
            </label>
            <div className="border p-2 rounded-md text-[15px]">
              <input
                required
                id="username"
                type="text"
                placeholder="Username"
                className="outline-none focus:outline-none w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="border p-2 rounded-md text-[15px]">
              <input
                required
                id="password"
                type="password"
                placeholder="Password"
                className="outline-none focus:outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className=" bg-teal-600 text-white btn">
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Log in"
            )}
          </button>
          <span className="text-sm font-semibold">
            First time using HavenPost?
            <Link to="/register" className="text-teal-600 hover:underline ml-1">
              Register!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
