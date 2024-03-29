import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const Items = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAricleNewChat = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post("/api/conversation/text/create");
      const conversationId = response.data.conversation.id;
      console.log(conversationId);

      router
        .push(`/text-generator/${conversationId}`)
        .then(() => router.reload());
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeNewChat = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post("/api/conversation/code/create");
      const conversationId = response.data.conversation.id;

      router
        .push(`/code-generator/${conversationId}`)
        .then(() => router.reload());
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEmailNewChat = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post("/api/conversation/email/create");
      const conversationId = response.data.conversation.id;

      router
        .push(`/email-generator/${conversationId}`)
        .then(() => router.reload());
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBlogNewChat = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post("/api/conversation/blog/create");
      const conversationId = response.data.conversation.id;

      router
        .push(`/blog-post-generate/${conversationId}`)
        .then(() => router.reload());
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <li>
        <Link
          href={"#"}
          className={`genarator-card `}
          onClick={handleAricleNewChat}
        >
          <div className="inner">
            <div className="left-align">
              <div className="img-bar">
                <Image
                  src={"/images/generator-icon/text.png"}
                  width={50}
                  height={50}
                  alt="AI Generator"
                />
              </div>
              <h5 className="title">Article Generator</h5>
            </div>
            <div className="right-align">
              {loading !== "" ? (
                <span className="rainbow-badge-card"></span>
              ) : (
                <div className="icon-bar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-right __web-inspector-hide-shortcut__"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </Link>
      </li>
      {/* code generator */}
      <li>
        <Link
          href={"#"}
          className={`genarator-card `}
          onClick={handleCodeNewChat}
        >
          <div className="inner">
            <div className="left-align">
              <div className="img-bar">
                <Image
                  src={"/images/generator-icon/code-editor.png"}
                  width={50}
                  height={50}
                  alt="AI Generator"
                />
              </div>
              <h5 className="title">Code Generator</h5>
            </div>
            <div className="right-align">
              {loading !== "" ? (
                <span className="rainbow-badge-card"></span>
              ) : (
                <div className="icon-bar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-right __web-inspector-hide-shortcut__"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </Link>
      </li>
      {/* email */}
      <li>
        <Link
          href={"#"}
          className={`genarator-card `}
          onClick={handleEmailNewChat}
        >
          <div className="inner">
            <div className="left-align">
              <div className="img-bar">
                <Image
                  src={"/images/generator-icon/email.png"}
                  width={50}
                  height={50}
                  alt="AI Generator"
                />
              </div>
              <h5 className="title">Email Writer</h5>
            </div>
            <div className="right-align">
              {loading !== "" ? (
                <span className="rainbow-badge-card"></span>
              ) : (
                <div className="icon-bar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-right __web-inspector-hide-shortcut__"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </Link>
      </li>

      {/* blog */}

      <li>
        <Link
          href={"#"}
          className={`genarator-card `}
          onClick={handleBlogNewChat}
        >
          <div className="inner">
            <div className="left-align">
              <div className="img-bar">
                <Image
                  src={"/images/generator-icon/document.png"}
                  width={50}
                  height={50}
                  alt="AI Generator"
                />
              </div>
              <h5 className="title">Blog Post</h5>
            </div>
            <div className="right-align">
              {loading !== "" ? (
                <span className="rainbow-badge-card"></span>
              ) : (
                <div className="icon-bar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-right __web-inspector-hide-shortcut__"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default Items;
