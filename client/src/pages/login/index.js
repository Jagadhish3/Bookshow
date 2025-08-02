import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import Button from "../../components/atoms/Button";
import MarvelBG from "../../assets/background.jpg";
import Logo from "../../assets/logo.png";
import styles from "./login.module.scss";
import { loginUser } from "../../apis/users";
import { toast } from "react-toastify";
import fetchUser from "../../store/actions/user.actions";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
      const result = await loginUser(formData);
      toast.success(result.data.result);
      dispatch(fetchUser());
      navigate("/");
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.error || "Login failed";
      if (status === 404) {
        toast.error(message);
        navigate("/signup");
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <main className={styles.container} style={{ backgroundImage: `url(${MarvelBG})` }}>
      <div className={styles.overlay}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2>
            Login to <img src={Logo} alt="Logo" className={styles.logo} />
          </h2>

          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <Button text={"Login"} />

          <p>
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
