import React, { useEffect } from "react";
import sal from "sal.js";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Reaction from "../Common/Reaction";
import loading from "../../public/images/icons/loader-one.gif";
import avatar from "../../public/images/team/avater.png";
import { useAppContext } from "@/context/Context";
import { useFetchData } from "@/lib/featcher";
import Items from "../Dashboard/items";

const BlogGeneretor = ({ conversationId }) => {
  const { isLoading } = useAppContext();
  const { data: blogPostResponse, isLoading: isBlogLoading } = useFetchData(
    `/api/blog-post-generator/${conversationId}`
  );

  useEffect(() => {
    sal();

    const cards = document.querySelectorAll(".bg-flashlight");

    cards.forEach((bgflashlight) => {
      bgflashlight.onmousemove = function (e) {
        let x = e.pageX - bgflashlight.offsetLeft;
        let y = e.pageY - bgflashlight.offsetTop;

        bgflashlight.style.setProperty("--x", x + "px");
        bgflashlight.style.setProperty("--y", y + "px");
      };
    });
  }, [blogPostResponse, isBlogLoading]);

  const { data: session } = useSession();

  return (
    <>
      {blogPostResponse?.conversation[0] ? (
        <>
          {blogPostResponse?.conversation[0]?.Blog.map((message, index) => (
            <div
              className="chat-box-list pt--30"
              id="chatContainer"
              data-sal="slide-up"
              data-sal-duration="700"
              data-sal-delay="100"
              key={index}
            >
              {message.prompt && (
                <div className="chat-box author-speech bg-flashlight">
                  <div className="inner">
                    <div className="chat-section">
                      <div className="author">
                        <Image
                          className="w-100"
                          width={40}
                          height={40}
                          src={session?.user?.image || avatar}
                          alt="Author"
                        />
                      </div>
                      <div className="chat-content">
                        <h6 className="title">
                          {session?.user.name || "user"}
                        </h6>
                        <p>{message.prompt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {message.role === "assistant" && (
                <div className="chat-box ai-speech bg-flashlight">
                  <div
                    className="inner top-flashlight leftside light-xl"
                    key={index}
                  >
                    <div className="chat-section">
                      <div className="author">
                        <Image
                          className="w-100"
                          src={avatar}
                          width={40}
                          height={40}
                          alt="ChatenAI"
                        />
                      </div>
                      <div className="chat-content">
                        <h6 className="title">
                          ChatenAI
                          <span className="rainbow-badge-card">Bot</span>
                        </h6>

                        {message?.content
                          ?.split("\n")
                          .map((line, lineIndex) => (
                            <p key={lineIndex}>{line}</p>
                          ))}
                        <Reaction />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="chat-section generate-section">
                  <div className="author">
                    <Image
                      src={loading}
                      width={40}
                      height={40}
                      alt="Loader Images"
                    />
                  </div>
                  <div className="chat-content">
                    <h6 className="title color-text-off mb--0">
                      Generating answers for you…
                    </h6>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="rainbow-generartor-section rainbow-section-gap">
            <div
              className="section-title text-center sal-animate"
              data-sal="slide-up"
              data-sal-duration="700"
              data-sal-delay="100"
            >
              <h4 className="subtitle ">
                <span className="theme-gradient">ChaetenAI</span>
              </h4>
              <h2 className="title w-600 mb--20">
                Unleashing the Power of ChatAI
              </h2>
              <p className="description b1">
                We provide Mastering the Art of ChatAI generate your text <br />
                Pioneering Conversations with AI.
              </p>
            </div>
            <div className="genarator-section">
              <ul className="genarator-card-group">
                <Items />
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogGeneretor;
