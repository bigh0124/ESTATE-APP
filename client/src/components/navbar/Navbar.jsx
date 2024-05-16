import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = true;
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
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John</span>
            <Link to="/profile" className="profileBtn">
              <div className="notification">3</div>
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
