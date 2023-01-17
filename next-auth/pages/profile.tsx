import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

import UserProfile from "../components/profile/user-profile";

export default function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Redirect away if NOT auth, server side protected route
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
