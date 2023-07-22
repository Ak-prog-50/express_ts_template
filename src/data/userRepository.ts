import { User } from '../domain/User';
import { IUserDocument, UserModel } from './models/UserModel';

class UserRepository {
  async save(user: User): Promise<IUserDocument> {
    const userDocument = new UserModel({
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    });
    await userDocument.save();
    return userDocument;
  }
}

export { UserRepository };
