import { useAppContext } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const Code = () => {
  const router = useRouter();
  const {
    fetchCodeConversations,

    codeConversations,
  } = useAppContext();

  useEffect(() => {
    fetchCodeConversations();
  }, [fetchCodeConversations, codeConversations]);
  return (
    <>
      {codeConversations?.map((conversation, index) => (
        <Link key={index} href={`/code-generator/${conversation.id}`}>
          <li
            className={`history-box ${
              router.asPath === `/code-generator/${conversation.id}`
                ? "active"
                : ""
            }`}
          >
            {conversation?.Code[0]?.prompt
              ? conversation?.Code[0]?.prompt
              : "New Chat"}
          </li>
        </Link>
      ))}
    </>
  );
};
