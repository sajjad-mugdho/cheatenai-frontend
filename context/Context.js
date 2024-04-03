import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CreateContext = createContext();
export const useAppContext = () => useContext(CreateContext);

const Context = ({ children }) => {
  const [mobile, setMobile] = useState(true);
  const [rightBar, setRightBar] = useState(true);
  const [toggleTop, setToggle] = useState(false);
  const [toggleAuth, setToggleAuth] = useState(true);
  const [showItem, setShowItem] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(true);
  const [messages, setMessages] = useState([]);
  const [emailResponse, setemailResponse] = useState([]);
  const [blogPostResponse, setBlogPostResponse] = useState([]);

  // side render
  const [articleConversations, setArticleConversation] = useState([]);
  const [blogConversations, setBlogConversation] = useState([]);
  const [codeConversations, setCodeConversation] = useState([]);
  const [emailConversations, setEmailConversation] = useState([]);

  const fetchArticleConversations = async () => {
    try {
      const response = await axios.get("/api/conversation/text/get");
      const data = response.data.articleConversations;

      setArticleConversation(data);
    } catch (error) {
      console.error("Error fetching Conversations:", error.message);
    }
  };
  const fetchBlogConversations = async () => {
    try {
      const response = await axios.get("/api/conversation/blog/get");
      const data = response.data.blogConversations;

      setBlogConversation(data);
    } catch (error) {
      console.error("Error fetching Conversations:", error.message);
    }
  };
  const fetchCodeConversations = async () => {
    try {
      const response = await axios.get("/api/conversation/code/get");
      const data = response.datacodeConversations;

      setCodeConversation(data);
    } catch (error) {
      console.error("Error fetching Conversations:", error.message);
    }
  };
  const fetchEmailConversations = async () => {
    try {
      const response = await axios.get("/api/conversation/email/get");
      const data = response.data.emailConversations;

      setEmailConversation(data);
    } catch (error) {
      console.error("Error fetching Conversations:", error.message);
    }
  };

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

  // Text Generator
  const handleGenerateText = async (prompt, conversationId) => {
    try {
      setIsloading(true);
      const userMessage = { role: "user", content: prompt };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/text-generator/generate", {
        messages: newMessages,
        conversationId,
      });

      const aiMessage = {
        role: "assistant",
        ...response.data,
      };

      setMessages((current) => [...current, userMessage, aiMessage]);

      setIsloading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsloading(false);
    }
  };

  // Email Generator

  const handleGenerateEmail = async (prompt, conversationId) => {
    try {
      const userMessage = { role: "user", content: prompt };
      const newMessages = [...messages, userMessage];
      setIsloading(true);

      const response = await axios.post("/api/email-generator/generate", {
        messages: newMessages,
        conversationId,
      });

      const aiMessage = {
        role: "assistant",
        ...response.data,
      };

      setemailResponse((current) => [...current, userMessage, aiMessage]);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };

  const handleGenerateCode = async (prompt, conversationId) => {
    try {
      const userMessage = { role: "user", content: prompt };
      const newMessages = [...messages, userMessage];
      setIsloading(true);

      const response = await axios.post("/api/code-generator/generate", {
        messages: newMessages,
        conversationId,
      });

      const aiMessage = {
        role: "assistant",
        ...response.data,
      };

      setemailResponse((current) => [...current, userMessage, aiMessage]);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsloading(false);
    }
  };

  const handleBlogPostGeneretor = async (prompt, conversationId) => {
    try {
      const userMessage = { role: "user", content: prompt };
      const newMessages = [...messages, userMessage];
      setIsloading(true);

      const response = await axios.post("/api/blog-post-generator/generate", {
        messages: newMessages,
        conversationId,
      });

      const aiMessage = {
        role: "assistant",
        ...response.data,
      };

      setBlogPostResponse((current) => [...current, userMessage, aiMessage]);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
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
        handleBlogPostGeneretor,
        blogPostResponse,
        handleGenerateCode,

        //
        articleConversations,
        fetchArticleConversations,
        blogConversations,
        fetchBlogConversations,
        codeConversations,
        fetchCodeConversations,
        emailConversations,
        fetchEmailConversations,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export default Context;
