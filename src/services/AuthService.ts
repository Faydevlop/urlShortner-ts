import { UserRepository } from "../repositories/UserRepository";
import { LinkRepository } from "../repositories/LinkRepository";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/util";

export class AuthService {
    private userRepo: UserRepository;
    private linkRepo: LinkRepository;

    constructor() {
        this.userRepo = new UserRepository();
        this.linkRepo = new LinkRepository();
    }

    async signup(username: string, email: string, password: string) {
        const hashedPassword = await hashPassword(password);
        const user = await this.userRepo.createUser({ username, email, password: hashedPassword });
        const token = generateToken(user._id.toString()); // Convert to string
        return { user, token };
    }
    
    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new Error("User not found");
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");
        const token = generateToken(user._id.toString()); // Convert to string
        return { user, token };
    }
    
}
