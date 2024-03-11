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
  const [activeMobileMenu, setActiveMobileMenu] = useState(true);

  const [messages, setMessages] = useState([]);

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

      const response = await axios.post("/api/text-generator/generate", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
    } catch (error) {
      if (error?.response?.status === 403) {
      } else {
      }
    } finally {
    }

    // try {
    //   const response = await axios.post("/api/text-generator/generate", {
    //     prompt,
    //   });

    //   setGenerateText(response);
    // } catch (error) {
    //   console.error("Error generating text:", error.message);
    // }
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
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export default Context;
