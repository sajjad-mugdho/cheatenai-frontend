import React, { useState } from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import PlansBilling from "@/components/PlansBilling/PlansBilling";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";
import axios from "axios";

const PlansBillingPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const cardNum = form.cardNum.value;
    const expMonth = form.expMonth.value;
    const expYear = form.expYear.value;
    const member = form.member.value;
    const amount = form.amount.value;

    const cvv2 = form.cvv2.value;
    const email = form.email.value;
    const mobileNo = form.mobileNo.value;

    const formData = {
      cardNum,
      expMonth,
      expYear,
      member,
      amount,
      cvv2,
      email,
      mobileNo,
    };
    console.log(formData);
    try {
      const response = await axios.post("/api/payment/create", formData);
      console.log("Payment created:", response.data);
      // Handle success response
    } catch (error) {
      console.error("Error creating payment:", error);
      // Handle error
    }
  };
  return (
    <>
      <PageHead title="Plans & Billing" />
      <ProtectedRoute>
        <main className="page-wrapper rbt-dashboard-page">
          <Context>
            <div className="rbt-panel-wrapper">
              <form onSubmit={handleSubmit}>
                <input type="text" name="cardNum" placeholder="Card Number" />
                <input
                  type="text"
                  name="expMonth"
                  placeholder="Expiration Month (MM)"
                />
                <input
                  type="text"
                  name="expYear"
                  placeholder="Expiration Year (YYYY)"
                />
                <input type="text" name="member" placeholder="member Name" />
                <input type="text" name="amount" placeholder="amount" />

                <input type="text" name="cvv2" placeholder="cvv2" />
                <input type="email" name="email" placeholder="email" />
                <input type="number" name="mobileNo" placeholder="mobileNo" />
                <button type="submit">Submit Payment</button>
              </form>
            </div>
          </Context>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default PlansBillingPage;
