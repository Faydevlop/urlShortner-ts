import  { ILink } from "../models/Link";
import { Link } from "../models/Link";

export class LinkRepository {
    async createLink(linkData: Partial<ILink>): Promise<ILink> {
        return await Link.create(linkData);
    }

    async findByShortCode(shortCode: string): Promise<ILink | null> {
        return await Link.findOne({ shorterLink: { $regex: `${shortCode}$` } });
    }

    async findByUserId(userId: string): Promise<ILink[]> {
        return await Link.find({ userId });
    }
}
