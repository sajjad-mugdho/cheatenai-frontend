import { useAppContext } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Article = () => {
  const router = useRouter();
  const {
    fetchArticleConversations,

    articleConversations,
  } = useAppContext();

  useEffect(() => {
    fetchArticleConversations();
  }, [fetchArticleConversations, articleConversations]);
  return (
    <>
      {articleConversations.map((conversation, index) => (
        <Link key={index} href={`/text-generator/${conversation.id}`}>
          <li
            className={`history-box ${
              router.asPath === `/text-generator/${conversation.id}`
                ? "active"
                : ""
            }`}
          >
            {conversation?.Article[0]?.prompt
              ? conversation?.Article[0]?.prompt
              : "New Chat"}
          </li>
        </Link>
      ))}
    </>
  );
};

export default Article;
