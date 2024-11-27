import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { Link } from "../models/Link";
import crypto from "crypto";
const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const result = await authService.signup(username, email, password);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


export const shortURL = async (req: Request, res: Response): Promise<void> => {
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
      const shortCode = crypto.randomBytes(3).toString("hex");
      const shortURL = `${process.env.BACKEND_URL}/${shortCode}`;
  
      const createdURL = new Link({
        userId,
        normalLink: url,
        shorterLink: shortURL,
      });
  
      await createdURL.save().catch((err) => {
        res
          .status(500)
          .json({ error: "Failed to save URL in database", details: err.message });
        return;
      });
  
  
      res.status(200).json({ originalUrl: url, shortenedUrl: shortURL });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const redirectShortURL = async (req: Request, res: Response): Promise<void> => {
    try {
      const { shortCode } = req.params;
  
      // Match the shorterLink that ends with the given shortCode
      const link = await Link.findOne({
        shorterLink: new RegExp(`https://url.moon-cart.shop/${shortCode}`),
      });

      console.log('req is here ',link);
      
      
  
      if (!link) {
        res.status(404).json({ error: "Short URL not found" });
        return;
      }

  
      res.redirect(link.normalLink);
      console.log('original link',link.normalLink);
      
    } catch (error: any) {
      console.error("Error during redirect:", error.message);
      res.status(500).json({ error: "An error occurred", details: error.message });
    }
  };

  export const getURLs = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const links = await Link.find({ userId });
      res.status(200).json(links);
     
      
      
      
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
