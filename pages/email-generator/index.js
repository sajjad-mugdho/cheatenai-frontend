import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import RightpanelDashboard from "@/components/Common/RightpanelDashboard";
import Modal from "@/components/Common/Modal";

import EmailGenerator from "@/components/EmailGenerator/EmailGenerator";
import StaticbarDashboardEmail from "@/components/Common/StaticbarDashboardEmail";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";

const EmailGeneratorPage = () => {
  return (
    <>
      <PageHead title="Email Generator" />
      <ProtectedRoute>
        <main className="page-wrapper rbt-dashboard-page">
          <Context>
            <div className="rbt-panel-wrapper">
              <HeaderDashboard display="" />
              <PopupMobileMenu />
              <LeftpanelDashboard />
              <RightpanelDashboard />
              <Modal />

              <div className="rbt-main-content">
                <div className="rbt-daynamic-page-content">
                  <div className="rbt-dashboard-content">
                    <div className="content-page">
                      <EmailGenerator />
                    </div>
                    <StaticbarDashboardEmail />
                  </div>
                </div>
              </div>
            </div>
          </Context>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default EmailGeneratorPage;
