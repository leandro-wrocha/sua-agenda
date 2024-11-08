import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./auth/[...nextauth]/route";

import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session,
    },
  }
}