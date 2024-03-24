import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/Context";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import sal from "sal.js";

import boxedLogo from "../../public/images/logo/boxed-logo.png";
import google from "../../public/images/sign-up/google.png";
import facebook from "../../public/images/sign-up/facebook.png";
import PageHead from "@/pages/Head";
import UserNav from "../Common/UserNav";
import ProfileBody from "../ProfileDetails/ProfileBody";

const PaymentDetails = () => {
  const { toggleAuth, setToggleAuth } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

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

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    await signIn("credentials", { email, password, redirect: false });
    setIsLoading(false);
  };

  const handleGoogleLogin = (e) => {
    signIn("google");
  };

  const handleFacebookLigin = async (e) => {
    signIn("facebook");
  };

  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const cardNumber = form.cardNumber.value;
    const cardDetails = form.cardDetails.value;
    const billingAddress = form.billingAddress.value;
    const phoneNumber = form.phoneNumber.value;

    console.log(
      name,
      email,
      password,
      cardNumber,
      cardDetails,
      billingAddress,
      phoneNumber
    );
    try {
      const response = await axios.post("/api/signup/signup", {
        name,
        email,
        password,
        cardNumber,
        cardDetails,
        billingAddress,
        phoneNumber,
      });

      console.log("Signup success:", response.data);
      form.reset();
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <>
      <div className="rbt-main-content mr--0 mb--0">
        <div className="rbt-daynamic-page-content center-width">
          <div className="rbt-dashboard-content">
            <div className="content-page pb--50">
              <div className="chat-box-list">
                <ProfileBody />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
