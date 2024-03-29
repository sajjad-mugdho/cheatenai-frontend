import { useAppContext } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const Blog = () => {
  const router = useRouter();
  const {
    fetchBlogConversations,

    blogConversations,
  } = useAppContext();

  useEffect(() => {
    fetchBlogConversations();
  }, []);

  return (
    <>
      {blogConversations.map((conversation, index) => (
        <Link key={index} href={`/text-generator/${conversation.id}`}>
          <li
            className={`history-box ${
              router.asPath === `/email-generator/${conversation.id}`
                ? "active"
                : ""
            }`}
          >
            {conversation?.Blog[0]?.prompt
              ? conversation?.Blog[0]?.prompt
              : "New Chat"}
          </li>
        </Link>
      ))}
    </>
  );
};
