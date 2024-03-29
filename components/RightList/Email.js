import { useAppContext } from "@/context/Context";
import Link from "next/link";
import React, { useEffect } from "react";

const Email = () => {
  const {
    fetchEmailConversations,

    emailConversations,
  } = useAppContext();

  useEffect(() => {
    fetchEmailConversations();
  }, [emailConversations]);
  return (
    <>
      {emailConversations.map((conversation, index) => (
        <Link key={index} href={`/email-generator/${conversation.id}`}>
          <li className="history-box">
            {conversation?.Email[0]?.prompt
              ? conversation?.Email[0]?.prompt
              : "New Chat"}
          </li>
        </Link>
      ))}
    </>
  );
};

export default Email;
