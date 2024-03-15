import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import Applications from "@/components/Applications/Applications";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";

const ApplicationPage = () => {
  return (
    <>
      <PageHead title="Applications" />
      <ProtectedRoute>
        <main className="page-wrapper rbt-dashboard-page">
          <Context>
            <div className="rbt-panel-wrapper">
              <HeaderDashboard display="d-none" />
              <PopupMobileMenu />
              <LeftpanelDashboard />

              <Applications />
            </div>
          </Context>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default ApplicationPage;
