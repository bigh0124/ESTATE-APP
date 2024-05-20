import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../api/apiRequest";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const ProfileUpdatePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: "updateUser",
    mutationFn: async () => {
      try {
        const res = await apiRequest.put(`/user/updateUser/${currentUser.id}`, {
          ...user,
          ...(avatar && { avatar }),
        });
        updateUser(res.data);

        navigate("/profile");
      } catch (err) {
        throw err;
      }
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleFormSubmit}>
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
          <button type="submit" disabled={isPending}>
            Update
          </button>
          {isError && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "dtkepckgq",
            uploadPreset: "ESTATEAPP",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
