import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/Context";
import React, { useEffect } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import sal from "sal.js";

import boxedLogo from "../../public/images/logo/boxed-logo.png";
import google from "../../public/images/sign-up/google.png";
import facebook from "../../public/images/sign-up/facebook.png";
import PageHead from "@/pages/Head";

const UserAuth = () => {
  const { toggleAuth, setToggleAuth } = useAppContext();

  useEffect(() => {
    sal();

    const cards = document.querySelectorAll(".bg-flashlight");

    cards.forEach((bgflashlight) => {
      bgflashlight.onmousemove = function (e) {
        let x = e.pageX - bgflashlight.offsetLeft;
        let y = e.pageY - bgflashlight.offsetTop;

        bgflashlight.style.setProperty("--x", x + "px");
        bgflashlight.style.setProperty("--y", y + "px");
      };
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signIn("credentials", { email, password }, { redirect: false });
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Signup success:", response.data);
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <>
      <PageHead title={`${toggleAuth ? "Log In" : "SignUp"}`} />
      <div
        className="signup-area rainbow-section-gapTop-big"
        data-black-overlay="2"
      >
        <div className="sign-up-wrapper rainbow-section-gap">
          <div className="sign-up-box bg-flashlight">
            <div className="signup-box-top top-flashlight light-xl">
              <Image
                src={boxedLogo}
                width={476}
                height={158}
                alt="sign-up logo"
              />
            </div>
            <div className="separator-animated animated-true"></div>
            <div className="signup-box-bottom">
              <div className="signup-box-content">
                <h4 className="title">Welcome Back!</h4>
                <div className="social-btn-grp">
                  <button
                    onClick={() => handleGoogleLogin()}
                    className="btn-default btn-border"
                  >
                    <span className="icon-left">
                      <Image
                        src={google}
                        width={18}
                        height={18}
                        alt="Google Icon"
                      />
                    </span>
                    Login with Google
                  </button>
                  <button className="btn-default btn-border">
                    <span className="icon-left">
                      <Image
                        src={facebook}
                        width={18}
                        height={18}
                        alt="Google Icon"
                      />
                    </span>
                    Login with Facebook
                  </button>
                </div>
                <div className="text-social-area">
                  <hr />
                  <span>Or continue with</span>
                  <hr />
                </div>
                {toggleAuth ? (
                  // login form

                  <form onSubmit={handleLogin}>
                    <div className="input-section mail-section">
                      <div className="icon">
                        <i className="feather-mail"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="input-section password-section">
                      <div className="icon">
                        <i className="feather-lock"></i>
                      </div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="forget-text">
                      <Link className="btn-read-more" href="#">
                        <span>Forgot password</span>
                      </Link>
                    </div>
                    <button type="submit" className="btn-default">
                      Sign In
                    </button>
                  </form>
                ) : (
                  // signup form

                  <form onSubmit={handleSignup}>
                    <div className="input-section mail-section">
                      <div className="icon">
                        <i className="feather-user"></i>
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="input-section mail-section">
                      <div className="icon">
                        <i className="feather-mail"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="input-section password-section">
                      <div className="icon">
                        <i className="feather-lock"></i>
                      </div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                      />
                    </div>

                    <button type="submit" className="btn-default">
                      Sign Up
                    </button>
                  </form>
                )}
              </div>
              <div className="signup-box-footer">
                <div className="bottom-text">
                  Don&apos;t have an account?
                  <a
                    className="btn-read-more ps-2"
                    onClick={() => setToggleAuth(!toggleAuth)}
                  >
                    {toggleAuth ? <span>Sign Up</span> : <span>Sign In</span>}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAuth;
