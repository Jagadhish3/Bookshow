import { useNavigate, NavLink } from "react-router";
import React, { useState } from "react";
import { signupUser } from "../../apis/users";
import MarvelBG from "../../assets/avengers.jpg";
import Button from "../../components/atoms/Button";
import styles from "./signup.module.scss";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);

   const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      console.log("Signup Data:", formData);
      if (formData.name===""||formData.email === "" || formData.password === "" || formData.confirmPassword==="") return;

      const result = await signupUser(formData);
      toast.success(result.data.result);
      navigate("/");
    }catch (error) {
      if (error.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.leftSide} style={{ backgroundImage: `url(${MarvelBG})` }}>
        <div className={styles.overlay}>
          <h1>Join the Multiverse</h1>
          <p>Create your BookShow account to explore Marvel magic</p>
        </div>
      </div>

      <div className={styles.signupContainer}>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              value={formData.password}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              required
              id="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm your password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <div className={styles.toggle}>
            <input
              type="checkbox"
              id="togglePassword"
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="togglePassword">Show Password</label>
          </div>

          <Button text={"Sign Up"} clickhandler={() => navigate("/login")} />

          <p>
            Already have an account? <NavLink to="/login">Login now</NavLink>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;
