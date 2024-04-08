import React, { useState } from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import PlansBilling from "@/components/PlansBilling/PlansBilling";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";
import axios from "axios";
import PaymentDetails from "@/components/payment/PaymentDetailsForm";
import { useRouter } from "next/router";

const PlansBillingPage = () => {
  const { query } = useRouter();

  console.log(query.Id);
  return (
    <>
      <PageHead title="Plans & Billing" />
      <ProtectedRoute>
        <main className="page-wrapper rbt-dashboard-page">
          <Context>
            <HeaderDashboard display="d-none" />
            <PaymentDetails />
          </Context>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default PlansBillingPage;
