import { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError } = useMutation({
    mutationKey: "login",
    mutationFn: async () => {
      try {
        await apiRequest.post("/auth/signIn", {
          username,
          password,
        });
        navigate("/");
      } catch (err) {
        throw err;
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button disabled={isPending} type="submit">
            Login
          </button>
          {isError && <span>username or password not correct</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
