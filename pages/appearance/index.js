import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import Appearance from "@/components/Appearance/Appearance";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";

const AppearancePage = () => {
  return (
    <>
      <PageHead title="Settings" />
      <ProtectedRoute>
        <main className="page-wrapper rbt-dashboard-page">
          <Context>
            <div className="rbt-panel-wrapper">
              <HeaderDashboard display="d-none" />
              <PopupMobileMenu />
              <LeftpanelDashboard />

              <Appearance />
            </div>
          </Context>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default AppearancePage;
