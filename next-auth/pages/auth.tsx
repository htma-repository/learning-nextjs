import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthForm from "../components/auth/auth-form";

export default function AuthPage() {
  // Redirect away if ALREADY auth
  const [isLoading, setIsLoading] = useState(true);
  const { replace } = useRouter();

  useEffect(() => {
    async function isSession() {
      const session = await getSession();

      if (session) {
        replace("/");
      } else {
        setIsLoading(false);
      }
    }

    isSession();
  }, [replace]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}
