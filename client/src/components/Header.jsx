import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useContext } from "react";

import { AuthContext } from "../../context/authContext";

const Header = () => {
  const links = [
    { name: "ART", href: "/?category=art" },
    { name: "SCIENCE", href: "/?category=science" },
    { name: "TECHNOLOGY", href: "/?category=technology" },
    { name: "CINEMA", href: "/?category=cinema" },
    { name: "FASHION", href: "/?category=fashion" },
    { name: "FOOD", href: "/?category=food" },
  ];

  const navigate = useNavigate();

  const { currentUser, login, logout } = useContext(AuthContext);

  return (
    <div className="px-4 sm:py-5 py-3 justify-between flex items-center gap-3">
      <div>
        <Link className="text-xl font-bold text-teal-600" to="/">
          HavenPost
        </Link>
      </div>
      <div className="gap-2 items-center md:flex hidden">
        {links.map((link, id) => (
          <Link to={link.href} key={id} className="font-bold text-[15px]">
            {link.name}
          </Link>
        ))}
        {currentUser && (
          <span className="font-semibold text-info truncate">
            {currentUser?.username}
          </span>
        )}
        {currentUser ? (
          <button className="btn btn-sm" onClick={logout}>
            Logout
          </button>
        ) : (
          <button
            className="btn btn-sm"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
        <Link to="/write" className="btn btn-sm btn-success">
          Write
        </Link>
      </div>

      <div className="dropdown dropdown-end block md:hidden">
        <div tabIndex={0} role="button" className="m-1 btn-sm btn">
          <MdOutlineMenu size={20} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <div className="gap-3 items-start flex flex-col">
            {links.map((link, id) => (
              <Link to={link.href} key={id} className="font-bold">
                {link.name}
              </Link>
            ))}
            {currentUser && (
              <span className="font-semibold text-info truncate">
                {currentUser?.username}
              </span>
            )}
            {currentUser ? (
              <button className="btn btn-sm" onClick={logout}>
                Logout
              </button>
            ) : (
              <button
                className="btn btn-sm"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
            <Link to="/write" className="btn btn-sm btn-success">
              Write
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
