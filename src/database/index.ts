import { PrismaUsersRepository } from "./prisma/prisma-users-repository";
import { StoreUserUseCase } from "@/models/use-cases/user/store-user";

const prismaUsersRepository = new PrismaUsersRepository();

export const storeUserUseCase = new StoreUserUseCase(prismaUsersRepository);
