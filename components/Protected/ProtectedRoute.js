import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (!session) {
    router.replace("/AuthPage");
    return null;
  }

  return children;
};

export default ProtectedRoute;
