import { Request, Response } from "express";

type JwtPayload = {
    id: number
}

export class UserProfile {

    async getProfile(req: Request, res: Response) {

        return res.json(req.user);

    };

};
