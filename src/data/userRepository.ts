import { User } from "../domain/User";

class UserRepository {
  async save(user: User): Promise<User> {
    // Implementation of saving the user to the database using a data mapper or ORM
    // For simplicity, we'll assume a synchronous save operation and return the user.
    return user;
  }
}

export { UserRepository };
