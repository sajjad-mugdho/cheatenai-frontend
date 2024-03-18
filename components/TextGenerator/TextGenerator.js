import React, { useEffect, useState } from "react";
import sal from "sal.js";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Reaction from "../Common/Reaction";
import loading from "../../public/images/icons/loader-one.gif";
import avatar from "../../public/images/team/avater.png";
import { useAppContext } from "@/context/Context";
import { useFetchData } from "@/lib/featcher";

const TextGenerator = () => {
  const { isLoading } = useAppContext();
  const { data: session } = useSession();

  const {
    data: messages,
    isLoading: isArticleLoading,
    isError,
    mutate,
  } = useFetchData("/api/text-generator/get-article");
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
  }, [messages, isLoading]);

  console.log(messages, session);

  return (
    <>
      {messages?.articles.map((message, index) => (
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
                    <h6 className="title">{session?.user.name || "user"}</h6>
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

                    {message.content.split("\n").map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                    <Reaction />
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && isArticleLoading && (
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
  );
};

export default TextGenerator;
