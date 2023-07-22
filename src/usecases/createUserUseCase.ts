import { User } from "../domain/User";
import { UserRepository } from "../data/userRepository";
import { UserAvatarService } from "../infrastructure/userAvatarService";

class CreateUserUseCase {
  private userRepository: UserRepository;
  private userAvatarService: UserAvatarService;

  constructor(
    userRepository: UserRepository,
    userAvatarService: UserAvatarService,
  ) {
    this.userRepository = userRepository;
    this.userAvatarService = userAvatarService;
  }

  async createUser(name: string, email: string): Promise<User> {
    const avatarUrl = await this.userAvatarService.generateUserAvatar(email);
    const user = new User(name, email, avatarUrl);
    user.setDefaultAvatar(); // Set default avatar if the user does not have one
    return this.userRepository.save(user);
  }
}

export { CreateUserUseCase };
