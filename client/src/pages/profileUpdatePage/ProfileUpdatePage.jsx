import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";

const ProfileUpdatePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    avatar: currentUser.avatar,
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" value={user.username} onChange={handleChange} />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={user.email} onChange={handleChange} />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={user.password} onChange={handleChange} />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={user.avatar || "/noavatar.jpg"} alt="" className="avatar" />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
