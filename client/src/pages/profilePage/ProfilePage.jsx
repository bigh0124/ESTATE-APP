import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);

  const signOut = useMutation({
    mutationKey: "signOut",
    mutationFn: async () => {
      try {
        await apiRequest.post("/auth/signOut");
        updateUser(null);
        navigate("/");
      } catch (err) {
        throw err;
      }
    },
  });

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.jpg"} />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <span>{currentUser.email}</span>
            </span>
          </div>
          <button className="signOut" onClick={() => signOut.mutate()} disabled={signOut.isPending}>
            Sign out
          </button>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
