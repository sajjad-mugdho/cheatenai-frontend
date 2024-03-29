import { useAppContext } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Email = () => {
  const router = useRouter();
  const {
    fetchEmailConversations,

    emailConversations,
  } = useAppContext();

  useEffect(() => {
    fetchEmailConversations();
  }, []);
  return (
    <>
      {emailConversations.map((conversation, index) => (
        <Link key={index} href={`/email-generator/${conversation.id}`}>
          <li
            className={`history-box ${
              router.asPath === `/email-generator/${conversation.id}`
                ? "active"
                : ""
            }`}
          >
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
