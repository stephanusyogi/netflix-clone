import{ NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { authOptions } from "../src/pages/api/auth/[...nextauth]";

import prismadb from './prismadb'
import { getServerSession } from 'next-auth';

const serverAuth = async (req: NextApiRequest, res:NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    throw new Error("Not signed in 1");
  }

  const currentUser = await prismadb.user.findUnique({
    where:{
      email: session?.user?.email || ''
    }
  })

  if (!currentUser?.email) {
    throw new Error("Not signed in 2");
  }

  return {currentUser}
}

export default serverAuth