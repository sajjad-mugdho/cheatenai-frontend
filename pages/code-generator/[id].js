import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import RightpanelDashboard from "@/components/Common/RightpanelDashboard";
import Modal from "@/components/Common/Modal";
import CodeGenerator from "@/components/CodeGenerator/CodeGenerator";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";
import StaticbarDashboardCode from "@/components/Common/StaticbarDashboardCode";
import { useRouter } from "next/router";

const CodeGeneratorPage = () => {
  const { query } = useRouter();
  const conversationId = query.id;
  return (
    <>
      <PageHead title="Code Generator" />
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
                      <CodeGenerator />
                    </div>
                    <StaticbarDashboardCode conversationId={conversationId} />
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

export default CodeGeneratorPage;
