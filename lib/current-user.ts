'use server';

import { getAuthUser } from './auth/auth';
import db from './database';

export async function getCurrentUser() {
  const auth_user = await getAuthUser();

  if (!auth_user?.id) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: { id: auth_user?.id },
    select: {
      id: true,
      name: true,
      role: true,
      image: true,
      email: true,
      accounts: {
        select: {
          providerId: true,
        },
      },
    },
  });

  if (!dbUser) return null;

  return {
    id: dbUser.id,
    name: dbUser.name,
    role: dbUser.role,
    avatar: dbUser.image,
    email: dbUser.email,
  };
}
