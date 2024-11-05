import { StoreUserUseCaseRequest, UsersRepository } from "@/models/repositories/users-repository"; 

export class StoreUserUseCase {
  constructor (private usersRepository: UsersRepository) {}

  async execute(request: StoreUserUseCaseRequest) {
    const { firstName, lastName, email, avatar, refreshToken, accessToken, emailVerified } = request;

    if (!emailVerified) { 
      return null;
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    
    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const user = await this.usersRepository.store({
      firstName,
      lastName,
      email,
      avatar,
      refreshToken,
      accessToken,
    });

    return user;
  }
}