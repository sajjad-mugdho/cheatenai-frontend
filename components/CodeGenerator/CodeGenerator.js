import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import sal from "sal.js";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-bash";

import user from "../../public/images/team/team-01.jpg";

import loading from "../../public/images/icons/loader-one.gif";
import avatar from "../../public/images/team/avater.png";
import Reaction from "../Common/Reaction";
import HtmlCode from "./HtmlCode";
import ServerCode from "./ServerCode";
import useClipboard from "@/context/useFetch";
import { useFetchData } from "@/lib/featcher";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context/Context";

const CodeGenerator = () => {
  const { isLoading } = useAppContext();
  const { data: session } = useSession();
  const {
    data: codeResponse,
    isLoading: isCodeLoading,
    isError,
    mutate,
  } = useFetchData("/api/code-generator/get-code");

  const codeBashRef = useRef(null);
  const codeBashRefTwo = useRef(null);
  const codeBashRefThree = useRef(null);
  const codeBashRefFour = useRef(null);
  const codeBashRefFive = useRef(null);

  const { isCopied } = useClipboard([
    { buttonClass: ".copy-bash", contentRef: codeBashRef },
    { buttonClass: ".copy-bash-two", contentRef: codeBashRefTwo },
    { buttonClass: ".copy-bash-three", contentRef: codeBashRefThree },
    { buttonClass: ".copy-bash-four", contentRef: codeBashRefFour },
    { buttonClass: ".copy-bash-five", contentRef: codeBashRefFive },
  ]);

  useEffect(() => {
    Prism.highlightAll();
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
  }, [codeResponse, isLoading]);

  const bashCodeString = `mkdir pricing-range-app
cd pricing-range-app
npm init -y
`;
  const bashCodeString2 = `npx create-react-app client`;
  const bashCodeString3 = `cd client 
npm install axios`;
  const nodeCodeString = `if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}`;

  console.log(codeResponse, "codeResponse");
  return (
    <>
      {codeResponse?.codes.map((code, index) => (
        <div key={index} className="chat-box-list pt--30" id="chatContainer">
          <div className="chat-box author-speech bg-flashlight">
            <div className="inner">
              <div className="chat-section">
                <div className="author">
                  <Image
                    className="w-100"
                    src={session?.user.image || user}
                    width={40}
                    height={40}
                    alt="Author"
                  />
                </div>
                <div className="chat-content">
                  <h6 className="title">{session?.user.name}</h6>
                  <p>{code.prompt}</p>
                </div>
              </div>
            </div>
          </div>

          {code?.role === "assistant" && (
            <div className="chat-box ai-speech bg-flashlight">
              <div className="inner top-flashlight leftside light-xl">
                <div className="chat-section generate-section">
                  <div className="author">
                    <i className="feather-check-circle"></i>
                  </div>
                  <div className="chat-content">
                    <h6 className="title color-text-off mb--0">
                      Scanning the data...
                    </h6>
                  </div>
                </div>

                <div className="chat-section generate-details-section">
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
                    <article className="documentation_body shortcode_text mb--20">
                      <div className="highlight position-relative">
                        {isCopied ? (
                          <button className="copy-to-clipboard-button copy-bash">
                            Copied
                          </button>
                        ) : (
                          <button className="copy-to-clipboard-button copy-bash">
                            Copy
                          </button>
                        )}
                        <pre
                          className="language-bash"
                          tabIndex={0}
                          ref={codeBashRef}
                          style={{ backgroundColor: "#070710" }}
                        >
                          <code className="language-bash" language="markup">
                            {code.content}
                          </code>
                        </pre>
                      </div>
                    </article>
                    <Reaction />
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && isCodeLoading && (
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

export default CodeGenerator;
