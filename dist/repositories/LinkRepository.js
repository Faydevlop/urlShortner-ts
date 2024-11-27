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
exports.LinkRepository = void 0;
const Link_1 = require("../models/Link");
class LinkRepository {
    createLink(linkData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Link_1.Link.create(linkData);
        });
    }
    findByShortCode(shortCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Link_1.Link.findOne({ shorterLink: { $regex: `${shortCode}$` } });
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Link_1.Link.find({ userId });
        });
    }
}
exports.LinkRepository = LinkRepository;
