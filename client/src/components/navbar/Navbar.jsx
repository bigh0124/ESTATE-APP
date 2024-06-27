import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/useNotificationStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { number, fetch } = useNotificationStore((state) => state);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <nav>
      <div className="left">
        <Link to={"/"} className="logo">
          <img src="/logo.png" />
          <span>EstateM</span>
        </Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/agents"}>Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profileBtn">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to={"/login"}>Sign in</Link>
            <Link to={"/register"} className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img src="/menu.png" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/agents"}>Agents</Link>
          <Link to={"/login"}>Sign in</Link>
          <Link to={"/register"}>Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
