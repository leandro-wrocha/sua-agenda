import { User } from "@prisma/client";

export type StoreUserUseCaseRequest = Omit<User, 'createdAt' |'updatedAt' | 'id'>;
export type UserStoreDTO = Omit<User, 'createdAt' | 'updatedAt' | 'id' | 'emailVerified'>;

export interface UsersRepository {
  findByID(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  store(user: UserStoreDTO): Promise<User>;
}