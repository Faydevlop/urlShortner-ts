"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerify = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Access Denied. No token provided." });
            return;
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Pass control to the next middleware or route handler
    }
    catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
exports.jwtVerify = jwtVerify;
