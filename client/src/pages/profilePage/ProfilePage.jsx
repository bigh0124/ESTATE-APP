import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const navigate = useNavigate();

  const signOut = useMutation({
    mutationKey: "signOut",
    mutationFn: async () => {
      try {
        await apiRequest.post("/auth/signOut");
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
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </span>
            <span>
              Username: <b>John</b>
            </span>
            <span>
              E-mail: <span>john@mail.com</span>
            </span>
          </div>
          <button className="signOut" onClick={() => signOut.mutate()} disabled={signOut.isPending}>
            Sign out
          </button>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
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
