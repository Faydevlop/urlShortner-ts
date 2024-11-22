import User, { IUser } from "../models/User";

export class UserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    async createUser(userData: Partial<IUser>): Promise<IUser> {
        return await User.create(userData);
    }
}
