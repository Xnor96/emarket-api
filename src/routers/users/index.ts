import express, { Express, Request, Response, Router } from 'express'
import params from "../../middlewares/params"

import { loginSchema } from "./schema"
import { createToken } from "../../services/session"

import User from "../../models/user"

const router = Router()

router.post('/login', params(loginSchema), async (req: Request, res: Response) => {
    let { email, password } = req.body

    try {

        let user: any = await User.findOne({ email, password });

        if (user === null) {
            return res.status(400).send({ error: 1, message: "Email o Contraseña incorrecta" });
        }

        const response = {
            token: createToken({
                user: user._id
            }),
        }

        res.cookie('token', response.token)
        res.send(response)

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: 1, message: "Internal server error" })
    }
})

export default router;