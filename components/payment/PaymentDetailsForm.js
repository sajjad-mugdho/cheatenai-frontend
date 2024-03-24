import { useAppContext } from "@/context/Context";
import React, { useEffect, useState } from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import sal from "sal.js";

import PaymentForm from "./PaymentForm";

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

  return (
    <>
      <div className="rbt-main-content">
        <div className="rbt-daynamic-page-content center-width">
          <div className="rbt-dashboard-content">
            <div className="content-page">
              <div className="chat-box-list">
                <PaymentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
