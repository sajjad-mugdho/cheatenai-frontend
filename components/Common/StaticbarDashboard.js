import { useAppContext } from "@/context/Context";
import { Tooltip } from "react-tooltip";
import React, { useRef } from "react";

const StaticbarDashboard = ({ conversationId }) => {
  const { handleGenerateText } = useAppContext();
  const textareaRef = useRef(null);

  const submitPrompt = async (e) => {
    e.preventDefault();

    const form = e.target;
    const prompt = form.prompt.value;
    form.reset();
    await handleGenerateText(prompt, conversationId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent textarea from adding new line

      e.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };
  return (
    <>
      <div className="rbt-static-bar">
        <>
          <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
          <form
            onSubmit={submitPrompt}
            className="new-chat-form border-gradient"
          >
            <textarea
              name="prompt"
              rows="1"
              placeholder="Send a message..."
              onKeyDown={handleKeyDown} // Add keydown event listener
              ref={textareaRef}
            ></textarea>
            <div className="left-icons">
              <div title="ChatenAI" className="form-icon icon-gpt">
                <i className="feather-aperture"></i>
              </div>
            </div>
            <div className="right-icons">
              <button
                type="submit"
                className="form-icon icon-send"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Send message"
              >
                <i className="feather-send"></i>
              </button>
            </div>
          </form>
        </>

        <p className="b3 small-text">
          ChatenAi can make mistakes. Consider checking important information.
        </p>
      </div>
    </>
  );
};

export default StaticbarDashboard;
