import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { useTranslation } from 'react-i18next';
import usersService from "../services/users.jsx";
import { useNotification } from "../component/notification.jsx";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { notify } = useNotification();

  const [isSignin, setIsSignin] = useState(true);
  const [showPasswordSignin, setShowPasswordSignin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);

  const [signin, setSignin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    name: "", email: "", password: "", confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (type === "signup") setIsSignin(false);
  }, [type]);

  const handleChange = (form, field, value) => {
    if (form === "signin") {
      setSignin(prev => ({ ...prev, [field]: value }));
    } else {
      setSignup(prev => ({ ...prev, [field]: value }));
    }
    setErrors(prev => ({ ...prev, [`${form}_${field}`]: false }));
  };

  const validateSignin = () => {
    const newErrors = {};
    if (!signin.email || !emailRegex.test(signin.email)) newErrors.signin_email = true;
    if (!signin.password) newErrors.signin_password = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signup.name) newErrors.signup_name = true;
    if (!signup.email || !emailRegex.test(signup.email)) newErrors.signup_email = true;
    if (!signup.password) newErrors.signup_password = true;
    if (!signup.confirmPassword || signup.confirmPassword !== signup.password) newErrors.signup_confirmPassword = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!validateSignin()) return;

    const res = await usersService.login(signin);
    if (res.status === 300) {
      notify({ type: "error", title: t("Error"), message: res.message, showCloseButton: true });
    } else {
      localStorage.setItem("user-info", JSON.stringify(res.data));
      navigate("/");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    const res = await usersService.signup({
      name: signup.name,
      email: signup.email,
      password: signup.password
    });

    if (res.status === 300 || res.status === 404) {
      notify({ type: "error", title: t("Error"), message: res.message, showCloseButton: true });
    } else {
      setIsSignin(true);
    }
  };

  return (
    <div className="loginPage">
      <Link to="/"> <i className="fa-solid fa-arrow-left"></i> {t("Back to home")} </Link>

      <div className="signinContainer">
        <div className={`signinContent ${isSignin ? "showSignin" : "hiddenSignin"}`}>
          <h1>{t("Sign In")}</h1>
          <form>
            <input
              className={errors.signin_email ? "unMatch" : "normalBorder"}
              type="email"
              placeholder="Email"
              value={signin.email}
              onChange={(e) => handleChange("signin", "email", e.target.value)}
            />
            <h5 className={errors.signin_email ? "showAlert" : "hiddenAlert"}>{t("Please enter a valid email address")}</h5>

            <div className="passwordSignin">
              <input
                className={errors.signin_password ? "unMatch" : "normalBorder"}
                type={showPasswordSignin ? "text" : "password"}
                placeholder={t("Password")}
                value={signin.password}
                onChange={(e) => handleChange("signin", "password", e.target.value)}
              />
              <i className={`fa-solid ${showPasswordSignin ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowPasswordSignin(!showPasswordSignin)}></i>
            </div>
            <h5 className={errors.signin_password ? "showAlert" : "hiddenAlert"}>{t("Please enter a valid password")}</h5>

            <button onClick={handleSignin}>{t("Sign In")}</button>
          </form>
          <button className="bfMobi" onClick={() => setIsSignin(false)}>{t("New user? Create account")}</button>
        </div>
      </div>

      <div className="signupContainer">
        <div className={`signupContent ${!isSignin ? "showSignup" : "hiddenSignup"}`}>
          <h1>{t("Sign Up")}</h1>
          <form>
            <input
              className={errors.signup_name ? "unMatch" : "normalBorder"}
              type="text"
              placeholder={t("Name")}
              value={signup.name}
              onChange={(e) => handleChange("signup", "name", e.target.value)}
            />
            <h5 className={errors.signup_name ? "showAlert" : "hiddenAlert"}>{t("Please enter a valid name")}</h5>

            <input
              className={errors.signup_email ? "unMatch" : "normalBorder"}
              type="email"
              placeholder="Email"
              value={signup.email}
              onChange={(e) => handleChange("signup", "email", e.target.value)}
            />
            <h5 className={errors.signup_email ? "showAlert" : "hiddenAlert"}>{t("Please enter a valid email address")}</h5>

            <div className="passwordSignup">
              <input
                className={errors.signup_password ? "unMatch" : "normalBorder"}
                type={showPasswordSignup ? "text" : "password"}
                placeholder={t("Password")}
                value={signup.password}
                onChange={(e) => handleChange("signup", "password", e.target.value)}
              />
              <i className={`fa-solid ${showPasswordSignup ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowPasswordSignup(!showPasswordSignup)}></i>
            </div>
            <h5 className={errors.signup_password ? "showAlert" : "hiddenAlert"}>{t("Please enter a valid password")}</h5>

            <input
              className={errors.signup_confirmPassword ? "unMatch" : (signup.confirmPassword === signup.password ? "match" : "unMatch")}
              type={showPasswordSignup ? "text" : "password"}
              placeholder={t("Confirm Password")}
              value={signup.confirmPassword}
              onChange={(e) => handleChange("signup", "confirmPassword", e.target.value)}
            />
            <h5 className={errors.signup_confirmPassword ? "showAlert" : "hiddenAlert"}>{t("Please enter a valid password")}</h5>

            <button onClick={handleSignup}>{t("Sign Up")}</button>
          </form>
          <button className="bfMobi" onClick={() => setIsSignin(true)}>{t("Already a User? Sign In")}</button>
        </div>
      </div>

      <div className={`loginMask ${isSignin ? "maskRight" : "maskLeft"}`}>
        <div className={`signupMaskContent ${!isSignin ? "showSignupMask" : "hiddenSignupMask"}`}>
          <h1>{t("Getting Started")}</h1>
          <h3>{t("Create New Account")}</h3>
          <button onClick={() => setIsSignin(true)}>{t("Sign In")} <i className="fa-solid fa-angle-right"></i></button>
        </div>
        <div className={`loginMaskContent ${!isSignin ? "showSignupMask" : "hiddenSignupMask"}`}>
          <h1>{t("Hello Friend!")}</h1>
          <h3>{t("Wellcome Back")}</h3>
          <button onClick={() => setIsSignin(false)}><i className="fa-solid fa-angle-left"></i> {t("Sign Up")}</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
