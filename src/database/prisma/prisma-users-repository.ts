import { prisma } from "@/config/database";
import { User } from "@prisma/client";
import { UsersRepository, UserStoreDTO } from "@/models/repositories/users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findByID(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id }});

    if (!user) return null;

    return user;
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async store(user: UserStoreDTO): Promise<User> {
    const userStored = await prisma.user.create({
      data: {...user}
    });

    return userStored;
  }
}