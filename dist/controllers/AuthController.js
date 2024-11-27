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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getURLs = exports.redirectShortURL = exports.shortURL = exports.login = exports.signup = void 0;
const AuthService_1 = require("../services/AuthService");
const Link_1 = require("../models/Link");
const crypto_1 = __importDefault(require("crypto"));
const authService = new AuthService_1.AuthService();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const result = yield authService.signup(username, email, password);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield authService.login(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const shortURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, userId } = req.body;
        if (!url) {
            res.status(400).json({ error: "URL is required" });
            return;
        }
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        // Generate a random string for the short URL (6 characters)
        const shortCode = crypto_1.default.randomBytes(3).toString("hex");
        const shortURL = `${process.env.BACKEND_URL}/${shortCode}`;
        const createdURL = new Link_1.Link({
            userId,
            normalLink: url,
            shorterLink: shortURL,
        });
        yield createdURL.save().catch((err) => {
            res
                .status(500)
                .json({ error: "Failed to save URL in database", details: err.message });
            return;
        });
        res.status(200).json({ originalUrl: url, shortenedUrl: shortURL });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.shortURL = shortURL;
const redirectShortURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortCode } = req.params;
        // Match the shorterLink that ends with the given shortCode
        const link = yield Link_1.Link.findOne({
            shorterLink: new RegExp(`https://url.moon-cart.shop/${shortCode}$`),
        });
        if (!link) {
            res.status(404).json({ error: "Short URL not found" });
            return;
        }
        res.redirect(link.normalLink);
    }
    catch (error) {
        console.error("Error during redirect:", error.message);
        res.status(500).json({ error: "An error occurred", details: error.message });
    }
});
exports.redirectShortURL = redirectShortURL;
const getURLs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const links = yield Link_1.Link.find({ userId });
        res.status(200).json(links);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getURLs = getURLs;
