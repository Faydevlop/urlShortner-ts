"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const LinkRepository_1 = require("../repositories/LinkRepository");
const hash_1 = require("../utils/hash");
const util_1 = require("../utils/util");
class AuthService {
    constructor() {
        this.userRepo = new UserRepository_1.UserRepository();
        this.linkRepo = new LinkRepository_1.LinkRepository();
    }
    signup(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, hash_1.hashPassword)(password);
            const user = yield this.userRepo.createUser({ username, email, password: hashedPassword });
            const token = (0, util_1.generateToken)(user._id.toString()); // Convert to string
            return { user, token };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByEmail(email);
            if (!user)
                throw new Error("User not found");
            const isMatch = yield (0, hash_1.comparePassword)(password, user.password);
            if (!isMatch)
                throw new Error("Invalid credentials");
            const token = (0, util_1.generateToken)(user._id.toString()); // Convert to string
            return { user, token };
        });
    }
}
exports.AuthService = AuthService;
