import { useAppContext } from "@/context/Context";
import React from "react";
import { Tooltip } from "react-tooltip";

const Form = () => {
  const { handleGenerateText } = useAppContext();

  const submitPrompt = async (e) => {
    e.preventDefault();

    const form = e.target;
    const prompt = form.prompt.value;

    await handleGenerateText(prompt);
    form.reset();
  };
  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
      <form onSubmit={submitPrompt} className="new-chat-form border-gradient">
        <textarea
          name="prompt"
          rows="1"
          placeholder="Send a message..."
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
  );
};

export default Form;
