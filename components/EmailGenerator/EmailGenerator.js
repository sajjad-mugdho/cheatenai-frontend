import React, { useEffect } from "react";

import sal from "sal.js";
import Image from "next/image";

import EmailGeneratorData from "../../data/dashboard.json";
import Reaction from "../Common/Reaction";
import { useAppContext } from "@/context/Context";
import avatar from "../../public/images/team/avater.png";
import loading from "../../public/images/icons/loader-one.gif";
import { useSession } from "next-auth/react";

const EmailGenerator = () => {
  const { emailResponse, isLoading } = useAppContext();
  const { data: session } = useSession();

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
  }, [emailResponse]);

  console.log(emailResponse, isLoading);
  return (
    <>
      {emailResponse?.map((email, index) => (
        <div className="chat-box-list pt--30" id="chatContainer" key={index}>
          {email.role === "user" && (
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
                    <p>{email.content}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="chat-box author-speech bg-flashlight">
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
                  <h6 className="title">{data.title}</h6>
                  <p>{data.desc}</p>
                </div>
              </div>
            </div>
          </div> */}

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
                    {email.content.split("\n").map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                    {/* <p className="mb--20">{innerData.dear}</p>
                    <p className="mb--20">{innerData.desc}</p>
                    <p className="mb--20">{innerData.desc2}</p>
                    <p className="mb--20">{innerData.desc3}</p>
                    <p className="mb--20">{innerData.desc4}</p>
                    <p className="mb--10">{innerData.wish}</p>
                    <p className="mb--20">{innerData.name}</p> */}
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
