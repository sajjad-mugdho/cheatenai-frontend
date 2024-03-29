import { useAppContext } from "@/context/Context";
import Link from "next/link";
import { useEffect } from "react";

const Article = () => {
  const {
    fetchArticleConversations,

    articleConversations,
  } = useAppContext();

  useEffect(() => {
    fetchArticleConversations();
  }, [articleConversations]);
  return (
    <>
      {articleConversations.map((conversation, index) => (
        <Link key={index} href={`/text-generator/${conversation.id}`}>
          <li className="history-box">
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
