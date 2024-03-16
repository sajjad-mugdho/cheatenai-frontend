// import React from "react";

// import { useSession } from "next-auth/react";

// import { useFetchData } from "@/lib/featcher";

// const BlogTest = () => {
//   const {
//     data: blogPostResponse,
//     isError,
//     isLoading,
//   } = useFetchData("/api/blog-post-generator/get-post");

//   const { data: session } = useSession();

//   console.log(blogPostResponse);

//   return (
//     // <>
//     //   {blogPostResponse?.map((message, index) => (
//     //     <div
//     //       className="chat-box-list pt--30"
//     //       id="chatContainer"
//     //       data-sal="slide-up"
//     //       data-sal-duration="700"
//     //       data-sal-delay="100"
//     //       key={index}
//     //     >
//     //       {message.role === "user" && (
//     //         <div className="chat-box author-speech bg-flashlight">
//     //           <div className="inner">
//     //             <div className="chat-section">
//     //               <div className="author">
//     //                 <Image
//     //                   className="w-100"
//     //                   width={40}
//     //                   height={40}
//     //                   src={session?.user?.image || avatar}
//     //                   alt="Author"
//     //                 />
//     //               </div>
//     //               <div className="chat-content">
//     //                 <h6 className="title">{session?.user.name || "user"}</h6>
//     //                 <p>{message.content}</p>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       )}

//     //       {message.role === "assistant" && (
//     //         <div className="chat-box ai-speech bg-flashlight">
//     //           <div
//     //             className="inner top-flashlight leftside light-xl"
//     //             key={index}
//     //           >
//     //             <div className="chat-section">
//     //               <div className="author">
//     //                 <Image
//     //                   className="w-100"
//     //                   src={avatar}
//     //                   width={40}
//     //                   height={40}
//     //                   alt="ChatenAI"
//     //                 />
//     //               </div>
//     //               <div className="chat-content">
//     //                 <h6 className="title">
//     //                   ChatenAI
//     //                   <span className="rainbow-badge-card">Bot</span>
//     //                 </h6>

//     //                 {message?.content?.split("\n").map((line, lineIndex) => (
//     //                   <p key={lineIndex}>{line}</p>
//     //                 ))}
//     //                 <Reaction />
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       )}

//     //       {/* {isLoading && (
//     //         <div className="chat-section generate-section">
//     //           <div className="author">
//     //             <Image
//     //               src={loading}
//     //               width={40}
//     //               height={40}
//     //               alt="Loader Images"
//     //             />
//     //           </div>
//     //           <div className="chat-content">
//     //             <h6 className="title color-text-off mb--0">
//     //               Generating answers for you…
//     //             </h6>
//     //           </div>
//     //         </div>
//     //       )} */}
//     //     </div>
//     //   ))}
//     // </>
//     <>
//       <div className=""></div>
//     </>
//   );
// };

// export default BlogTest;
