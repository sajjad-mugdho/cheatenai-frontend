import { useAppContext } from "@/context/Context";
import Link from "next/link";
import React, { useEffect } from "react";

export const Code = () => {
  const {
    fetchCodeConversations,

    codeConversations,
  } = useAppContext();

  useEffect(() => {
    fetchCodeConversations();
  }, [codeConversations]);
  return (
    <>
      {codeConversations.map((conversation, index) => (
        <Link key={index} href={`/code-generator/${conversation.id}`}>
          <li className="history-box">
            {conversation?.Code[0]?.prompt
              ? conversation?.Code[0]?.prompt
              : "New Chat"}
          </li>
        </Link>
      ))}
    </>
  );
};
