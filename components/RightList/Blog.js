import { useAppContext } from "@/context/Context";
import Link from "next/link";
import React, { useEffect } from "react";

export const Blog = () => {
  const {
    fetchBlogConversations,

    blogConversations,
  } = useAppContext();

  useEffect(() => {
    fetchBlogConversations();
  }, [blogConversations]);

  return (
    <>
      {blogConversations.map((conversation, index) => (
        <Link key={index} href={`/text-generator/${conversation.id}`}>
          <li className="history-box">
            {conversation?.Blog[0]?.prompt
              ? conversation?.Blog[0]?.prompt
              : "New Chat"}
          </li>
        </Link>
      ))}
    </>
  );
};
