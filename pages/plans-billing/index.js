import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import PlansBilling from "@/components/PlansBilling/PlansBilling";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";

const PlansBillingPage = () => {
  return (
    <>
      <PageHead title="Plans & Billing" />
      <ProtectedRoute>
        <main className="page-wrapper rbt-dashboard-page">
          <Context>
            <div className="rbt-panel-wrapper">
              <HeaderDashboard display="d-none" />
              <PopupMobileMenu />
              <LeftpanelDashboard />

              <PlansBilling />
            </div>
          </Context>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default PlansBillingPage;
