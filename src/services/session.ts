import * as dayjs from "dayjs";
import express, { Express, Request, Response, NextFunction } from 'express';
import * as jwt from "jwt-simple";

export function createToken(data: any, options = { "unit": "days", quantity: 1 }): string {
    const payload: any = {
        iap: dayjs().unix(),
        exp: dayjs().add(options.quantity, (options.unit as dayjs.ManipulateType)).unix(),
        ...data
    }
    return jwt.encode(payload, "cyph.TOKEN_SECRET");
}

export const verifySession = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth) {
        try {
            const decoded = jwt.decode(auth, "cyph.TOKEN_SECRET")
            delete decoded.iap;
            delete decoded.exp;
            
            req.headers.data = decoded;
            next();
        } catch (error) {
            if (error.toString() == "Error: Token expired") {
                res.status(401).send({ expired: true })
                return
            }
            res.status(400).send({ error: 1, message: error.toString() });
        }
    } else {
        res.status(400).send({
            error: 1,
            message: 'token expected'
        })
    }
}