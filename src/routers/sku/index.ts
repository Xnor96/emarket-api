import express, { Express, Request, Response, Router } from 'express'
import Sku from '../../models/sku'
import paginator from '../../middlewares/paginator';

const router = Router()

router.get('/', paginator(25), async (req: any, res: Response) => {
    const { page, size } = req.paginator
    try {
        const filter = {}
        let sku = (await Sku.find(filter).skip(page * size).limit(size)).map(p => p.toJSON());
        res.send({
            sku: sku,
            count: await Sku.countDocuments(filter)
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: 1, message: "Internal server error" })
    }
})

export default router;