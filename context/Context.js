import axios from "axios";

import React, { createContext, useContext, useState, useEffect } from "react";

export const CreateContext = createContext();

export const useAppContext = () => useContext(CreateContext);

const Context = ({ children }) => {
  const [mobile, setMobile] = useState(true);
  const [rightBar, setRightBar] = useState(true);
  const [toggleTop, setToggle] = useState(false);
  const [toggleAuth, setToggleAuth] = useState(false);
  const [showItem, setShowItem] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(true);
  const [messages, setMessages] = useState([]);
  const [emailResponse, setemailResponse] = useState([]);

  const checkScreenSize = () => {
    if (window.innerWidth < 1200) {
      setMobile(false);
      setRightBar(false);
    } else {
      setMobile(true);
      setRightBar(true);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const shouldCollapseLeftbar = !mobile;
  const shouldCollapseRightbar = !rightBar;

  const handleGenerateText = async (prompt) => {
    try {
      const userMessage = { role: "user", content: prompt };
      const newMessages = [...messages, userMessage];
      setIsloading(true);

      const response = await axios.post("/api/text-generator/generate", {
        messages: newMessages,
      });

      const aiMessage = {
        role: "assistant",
        ...response.data,
      };
      setMessages((current) => [...current, userMessage, aiMessage]);
    } catch (error) {
      if (error?.response?.status === 403) {
        setIsloading(false);
      } else {
      }
    } finally {
      setIsloading(false);
    }
  };

  // Email Generator

  const handleGenerateEmail = async (prompt) => {
    try {
      const userMessage = { role: "user", content: prompt };
      const newMessages = [...messages, userMessage];
      setIsloading(true);

      const response = await axios.post("/api/email-generator/generate", {
        messages: newMessages,
      });

      const aiMessage = {
        role: "assistant",
        ...response.data,
      };

      setemailResponse((current) => [...current, userMessage, aiMessage]);
    } catch (error) {
      if (error?.response?.status === 403) {
        setIsloading(false);
      } else {
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <CreateContext.Provider
      value={{
        mobile,
        setMobile,
        showItem,
        setShowItem,
        activeMobileMenu,
        setActiveMobileMenu,
        toggleTop,
        setToggle,
        toggleAuth,
        setToggleAuth,
        rightBar,
        setRightBar,
        shouldCollapseLeftbar,
        shouldCollapseRightbar,
        messages,
        handleGenerateText,
        isLoading,
        handleGenerateEmail,
        emailResponse,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export default Context;
