import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import Dashboard from "@/components/Dashboard/Dashboard";
import Modal from "@/components/Common/Modal";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";

const DashboardPage = () => {
  return (
    <>
      <PageHead title="Dashboard" />
      <ProtectedRoute>
        <main className="page-wrapper rbt-dashboard-page">
          <Context>
            <div className="rbt-panel-wrapper">
              <HeaderDashboard display="d-none" />
              <PopupMobileMenu />
              <LeftpanelDashboard />
              <Modal />

              <Dashboard />
            </div>
          </Context>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default DashboardPage;
