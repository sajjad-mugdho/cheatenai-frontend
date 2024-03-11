import React, { useState } from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import RightpanelDashboard from "@/components/Common/RightpanelDashboard";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import Modal from "@/components/Common/Modal";
import TextGenerator from "@/components/TextGenerator/TextGenerator";
import StaticbarDashboard from "@/components/Common/StaticbarDashboard";
import axios from "axios";
import { useRouter } from "next/router";

const TextGeneratorPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const onSubmit = async (values) => {
    try {
      const userMessage = {
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/text-generator/generate", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
    } catch (error) {
      if (error?.response?.status === 403) {
      } else {
      }
    } finally {
      // router.refresh();
    }
  };
  return (
    <>
      <PageHead title="Text Generator" />

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
                    <TextGenerator />
                  </div>
                  <StaticbarDashboard />
                </div>
              </div>
            </div>
          </div>
        </Context>
      </main>
    </>
  );
};

export default TextGeneratorPage;
