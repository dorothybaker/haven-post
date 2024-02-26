import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="p-4 flex flex-col gap-2 justify-center items-center text-center mt-5 bg-[#b9e7e7]">
      <h1 className="text-xl !font-bold">HavenPost</h1>
      <p className="text-sm text-[#828282] font-semibold">
        A user-friendly platform where you can easily create and share your blog
        posts, engage with readers, and showcase your content in a personalized
        way.
      </p>

      <div className="flex items-center gap-2 text-teal-600">
        <FaTwitter size={22} />
        <FaFacebook size={22} />
        <FaInstagram size={22} />
      </div>
    </div>
  );
};

export default Footer;
