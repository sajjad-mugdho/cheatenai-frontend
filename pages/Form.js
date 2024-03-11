import { useRouter } from "next/router";
import React from "react";
import { Tooltip } from "react-tooltip";

const Form = () => {
  const router = useRouter();

  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
      <form className="new-chat-form border-gradient">
        <textarea rows="1" placeholder="Send a message..."></textarea>
        <div className="left-icons">
          <div title="ChatenAI" className="form-icon icon-gpt">
            <i className="feather-aperture"></i>
          </div>
        </div>
        <div className="right-icons">
          <a
            className="form-icon icon-send"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Send message"
          >
            <i className="feather-send"></i>
          </a>
        </div>
      </form>
    </>
  );
};

export default Form;
