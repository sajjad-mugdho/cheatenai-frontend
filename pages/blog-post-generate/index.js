import React, { useState } from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import RightpanelDashboard from "@/components/Common/RightpanelDashboard";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import Modal from "@/components/Common/Modal";
import StaticbarDashboardBlog from "@/components/Common/StaticbarDashboardBlog";
import BlogGeneretor from "@/components/BlogPost/BlogPost";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";

const TextGeneratorPage = () => {
  return (
    <>
      <PageHead title="Text Generator" />
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
                      <BlogGeneretor />
                    </div>
                    <StaticbarDashboardBlog />
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

export default TextGeneratorPage;
