import React, { useEffect } from "react";

import sal from "sal.js";
import Image from "next/image";

import Reaction from "../Common/Reaction";
import { useAppContext } from "@/context/Context";
import avatar from "../../public/images/team/avater.png";
import loading from "../../public/images/icons/loader-one.gif";
import { useSession } from "next-auth/react";
import { useFetchData } from "@/lib/featcher";

const EmailGenerator = ({ conversationId }) => {
  const { isLoading } = useAppContext();
  const { data: session } = useSession();

  const { data: emailResponse, isLoading: isEmailLoading } = useFetchData(
    `/api/email-generator/${conversationId}`
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
  }, [emailResponse, isEmailLoading]);

  return (
    <>
      {emailResponse?.conversation[0]?.Email.map((email, index) => (
        <div className="chat-box-list pt--30" id="chatContainer" key={index}>
          {email.prompt && (
            <div className="chat-box author-speech bg-flashlight">
              <div className="inner">
                <div className="chat-section">
                  <div className="author">
                    <Image
                      className="w-100"
                      width={40}
                      height={40}
                      src={session?.user.image || avatar}
                      alt="Author"
                    />
                  </div>
                  <div className="chat-content">
                    <h6 className="title">{session?.user.name || "user"}</h6>
                    <p>{email.prompt}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {email.role === "assistant" && (
            <div className="chat-box ai-speech bg-flashlight">
              <div
                className="inner top-flashlight leftside light-xl"
                key={index}
              >
                <div className="chat-section">
                  <div className="author">
                    <Image
                      src={avatar}
                      width={40}
                      height={40}
                      alt="Loader Images"
                    />
                  </div>
                  <div className="chat-content">
                    <h6 className="title">
                      ChatenAI <span className="rainbow-badge-card">Bot</span>
                    </h6>
                    {email?.content?.split("\n").map((line, lineIndex) => (
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
  );
};

export default EmailGenerator;
